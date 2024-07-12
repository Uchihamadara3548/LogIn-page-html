-- database.sql

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password_hash  TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES ('user1', 'pass1');
INSERT INTO users (username, password) VALUES ('user2', 'pass2');