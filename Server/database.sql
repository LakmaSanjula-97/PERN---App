CREATE DATABASE todo;

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    cretaed_at DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);