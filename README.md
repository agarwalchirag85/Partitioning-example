# Partitioning App (Node.js + PostgreSQL + Knex.js)

This project demonstrates **PostgreSQL table partitioning** using a Node.js backend built with Express.js and Knex.js.

---

## 🧠 What is Partitioning?

**Partitioning** in PostgreSQL helps split large tables into smaller, more manageable pieces (partitions) based on a column value. PostgreSQL automatically routes inserts and queries to the appropriate partition.

---

## 📦 Features

- ✅ Range Partitioning (e.g., `created_at`)
- ✅ List Partitioning (e.g., region or status)
- ✅ Hash Partitioning (e.g., user ID)
- ✅ Knex.js as PostgreSQL client
- ✅ Docker setup
- ✅ Unit tests with Jest
- ✅ EXPLAIN plans to verify partition pruning

---

## 📁 Project Structure

```
partitioning-app/
├── routes/            # Express routes for users, orders, logs
├── __tests__/         # Jest test cases
├── knexfile.js        # Knex config
├── db.js              # DB connection via Knex
├── index.js           # App entry point
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
```

---

## 🐳 Setup with Docker

1. Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

2. Connect to the DB and create partitioned tables manually:

```sql
-- Example: Range partitioning
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at DATE NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE users_2023 PARTITION OF users
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE users_2024 PARTITION OF users
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

Repeat for other models (e.g., orders, logs) using LIST/HASH strategies.

---

## 🚀 Start App

```bash
npm install
npm start
```

---

## ✅ API Routes

- `POST /users` — Insert user (range-partitioned)
- `GET /users` — Fetch all users
- `GET /orders` — Fetch list-partitioned orders
- `POST /logs` — Insert into hash-partitioned log table

---

## 🧪 Run Unit Tests

```bash
npm test
```

---

## 🔍 Verify Partition Usage

Use EXPLAIN to verify that PostgreSQL uses the correct partition:

```js
const result = await db.raw(\`
  EXPLAIN SELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
\`);
console.log(result.rows.map(r => r['QUERY PLAN']).join('\n'));
```

---

## 📚 Learnings

- How to define and manage PostgreSQL partitions
- How partition pruning works
- Benefits for query performance and data management
- Using Knex.js with partitioned tables

---

## 🙌 Author

Built by [Chirag Agarwal] — Learn deeply, scale wisely.
