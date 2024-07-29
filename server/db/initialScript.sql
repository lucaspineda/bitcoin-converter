CREATE TABLE IF NOT EXISTS bitcoin_price_index (
    id INTEGER PRIMARY KEY,
    code VARCHAR(3),
    symbol VARCHAR(255),
    rate_float FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);