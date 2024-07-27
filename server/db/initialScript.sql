CREATE TABLE IF NOT EXISTS currency (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    code VARCHAR(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS bitcoin_price_index (
    id INTEGER PRIMARY KEY,
    code VARCHAR(3),
    symbol VARCHAR(255),
    rate_float FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO currency (id, code)
VALUES (1, 'USD'), (2, 'GBP'), (3, 'EUR');



INSERT INTO bitcoin_price_index (currency_id, symbol, rate_float)
VALUES (1, '$', 54.2);