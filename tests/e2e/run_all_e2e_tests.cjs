#!/usr/bin/env node
/**
 * Master E2E Test Runner for Khotwa Angular 22 Curriculum & Simulator
 * Executes all 4 test tiers:
 * - Tier 1: Feature Coverage (7 feature areas, all 60 lessons)
 * - Tier 2: Boundary & Corner Cases (empty inputs, formats, security, whitespace)
 * - Tier 3: Cross-Feature Combinations (pairwise feature interactions)
 * - Tier 4: Real-World Application Scenarios (complete user workflows)
 * 
 * Usage:
 *   node tests/e2e/run_all_e2e_tests.cjs
 */

const { spawn } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const E2E_DIR = __dirname;
const ROOT_DIR = path.resolve(E2E_DIR, '../..');

const SUITES = [
  {
    tier: 'Tier 1',
    name: 'Feature Coverage (7 Areas / 60 Lessons)',
    file: 'tier1_feature_coverage.test.cjs'
  },
  {
    tier: 'Tier 2',
    name: 'Boundary & Corner Cases',
    file: 'tier2_boundary_corner.test.cjs'
  },
  {
    tier: 'Tier 3',
    name: 'Cross-Feature Combinations',
    file: 'tier3_cross_feature.test.cjs'
  },
  {
    tier: 'Tier 4',
    name: 'Real-World Application Scenarios',
    file: 'tier4_application_scenarios.test.cjs'
  }
];

function runSuite(suite) {
  return new Promise((resolve) => {
    const fullPath = path.join(E2E_DIR, suite.file);
    const start = Date.now();
    
    // Spawn node --test for the specific suite
    const child = spawn(process.execPath, ['--test', fullPath], {
      cwd: ROOT_DIR,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      const duration = Date.now() - start;

      // Parse test counts from node:test TAP / spec output
      const passMatch = stdout.match(/ℹ pass (\d+)/);
      const failMatch = stdout.match(/ℹ fail (\d+)/);
      const totalMatch = stdout.match(/ℹ tests (\d+)/);

      const passed = passMatch ? parseInt(passMatch[1], 10) : (code === 0 ? 1 : 0);
      const failed = failMatch ? parseInt(failMatch[1], 10) : (code === 0 ? 0 : 1);
      const total = totalMatch ? parseInt(totalMatch[1], 10) : (passed + failed);

      resolve({
        suite,
        code,
        duration,
        passed,
        failed,
        total,
        stdout,
        stderr
      });
    });
  });
}

async function runAll() {
  console.log('================================================================');
  console.log('🚀 Khotwa Angular 22 - Master E2E Test Suite Runner');
  console.log('================================================================\n');

  const results = [];
  let totalPassed = 0;
  let totalFailed = 0;
  let totalTests = 0;
  const overallStart = Date.now();

  for (const suite of SUITES) {
    process.stdout.write(`⏳ Running [${suite.tier}] ${suite.name}... `);
    const result = await runSuite(suite);
    results.push(result);

    totalPassed += result.passed;
    totalFailed += result.failed;
    totalTests += result.total;

    if (result.code === 0 && result.failed === 0) {
      console.log(`✅ PASS (${result.passed}/${result.total} tests in ${result.duration}ms)`);
    } else {
      console.log(`❌ FAIL (${result.failed} failed of ${result.total} in ${result.duration}ms)`);
      if (result.stderr) console.error(result.stderr);
      if (result.stdout) console.log(result.stdout);
    }
  }

  const overallDuration = Date.now() - overallStart;

  console.log('\n================================================================');
  console.log('📊 Comprehensive E2E Execution Summary');
  console.log('================================================================');
  console.table(
    results.map((r) => ({
      Tier: r.suite.tier,
      Suite: r.suite.name,
      Status: r.code === 0 && r.failed === 0 ? 'PASSED ✅' : 'FAILED ❌',
      Passed: r.passed,
      Failed: r.failed,
      Total: r.total,
      'Time (ms)': r.duration
    }))
  );

  console.log(`Total Test Cases : ${totalTests}`);
  console.log(`Passed           : ${totalPassed} ✅`);
  console.log(`Failed           : ${totalFailed} ${totalFailed === 0 ? '🎉' : '❌'}`);
  console.log(`Total Time       : ${overallDuration}ms\n`);

  if (totalFailed > 0) {
    console.error('❌ E2E Test Suite FAILED.');
    process.exit(1);
  } else {
    console.log('✅ ALL E2E TEST TIERS PASSED SUCCESSFULLY (Exit Code 0).');
    process.exit(0);
  }
}

if (require.main === module) {
  runAll().catch((err) => {
    console.error('Fatal runner error:', err);
    process.exit(1);
  });
}

module.exports = { runAll, SUITES };
