BEGIN;
CREATE SCHEMA IF NOT EXISTS pharmacy;
SET search_path = pharmacy;

CREATE TABLE categories (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL UNIQUE);
CREATE TABLE suppliers (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL, phone text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE products (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, trade_name text NOT NULL, active_ingredient text NOT NULL, category_id bigint NOT NULL REFERENCES categories(id), barcode text NOT NULL UNIQUE, reorder_level integer NOT NULL CHECK (reorder_level >= 0), active boolean NOT NULL DEFAULT true);
CREATE TABLE batches (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, product_id bigint NOT NULL REFERENCES products(id), supplier_id bigint REFERENCES suppliers(id), batch_code text NOT NULL, produced_on date, expires_on date NOT NULL, purchase_price numeric(12,2) NOT NULL CHECK (purchase_price >= 0), sale_price numeric(12,2) NOT NULL CHECK (sale_price >= purchase_price), quantity integer NOT NULL CHECK (quantity >= 0), UNIQUE (product_id, batch_code));
CREATE TABLE customers (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL, phone text UNIQUE);
CREATE TABLE sales (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, customer_id bigint REFERENCES customers(id), sold_at timestamptz NOT NULL DEFAULT now(), status text NOT NULL DEFAULT 'posted' CHECK (status IN ('posted','voided','returned')));
CREATE TABLE sale_items (sale_id bigint NOT NULL REFERENCES sales(id) ON DELETE CASCADE, batch_id bigint NOT NULL REFERENCES batches(id), quantity integer NOT NULL CHECK (quantity > 0), unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0), PRIMARY KEY (sale_id, batch_id));
CREATE TABLE payments (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, sale_id bigint NOT NULL REFERENCES sales(id) ON DELETE CASCADE, method text NOT NULL CHECK (method IN ('cash','card','transfer')), amount numeric(12,2) NOT NULL CHECK (amount > 0));
CREATE TABLE stock_movements (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, batch_id bigint NOT NULL REFERENCES batches(id), quantity_delta integer NOT NULL CHECK (quantity_delta <> 0), reason text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE audit_log (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, actor text NOT NULL, action text NOT NULL, entity_name text NOT NULL, entity_id bigint NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX batches_expiry_idx ON batches (expires_on) WHERE quantity > 0;
CREATE INDEX sale_items_batch_idx ON sale_items (batch_id);
COMMIT;
