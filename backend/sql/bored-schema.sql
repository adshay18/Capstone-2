CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username VARCHAR(25) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    age INTEGER,
    completed_tasks INTEGER DEFAULT 0,
    avatar TEXT
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users ON DELETE CASCADE,
    description TEXT NOT NULL
);

CREATE TABLE badges (
    badge_id SERIAL PRIMARY KEY,
    unlock_num INTEGER NOT NULL,
    message TEXT NOT NULL
);

CREATE TABLE collected_badges (
    id SERIAL PRIMARY KEY,
    badge_id INTEGER
        REFERENCES badges ON DELETE CASCADE,
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE
);