# Personal Finance Tracker API

A RESTful backend for tracking income and expenses, with JWT authentication, categories, monthly summaries, profile picture upload, and an admin overview.

**Live API docs (Swagger):** https://finance-tracker-api-o7l0.onrender.com/docs
**Demo video:** <Loom link>

> Hosted on Render's free plan, so the first request after inactivity can take about 50 seconds.

## Features
- Register and login with JWT and bcrypt, with roles `user` and `admin`
- Income and expense transactions, each linked to a predefined category
- Monthly summary: totals per category, income, expense, and balance
- Profile picture upload to Cloudinary (multer memory storage)
- Admin overview: total users, transactions, and top spending categories
- Zod validation, Helmet, CORS, rate limiting, request logging, and a global error handler
- Swagger documentation with Bearer authentication

## Tech stack
Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Zod, Multer, Cloudinary, Swagger, Render, MongoDB Atlas

## Endpoints
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /auth/register | No | Create an account |
| POST | /auth/login | No | Log in and get a token |
| GET | /auth/profile | Yes | Current user |
| POST | /transactions | Yes | Add a transaction |
| GET | /transactions | Yes | List my transactions |
| PUT | /transactions/:id | Yes | Edit a transaction |
| DELETE | /transactions/:id | Yes | Delete a transaction |
| GET | /transactions/monthly-summary?month=YYYY-MM | Yes | Totals per category |
| GET | /categories | Yes | List categories |
| POST | /upload/profile-picture | Yes | Upload a profile picture |
| GET | /admin/overview | Admin | Platform totals |

## Run locally
1. `git clone https://github.com/fahma-ali/finance-tracker-api.git`
2. `cd finance-tracker-api` and `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. `npm run seed` to add the default categories
5. `npm run dev`
6. Open http://localhost:5000/docs

## Design notes
- `amount` is always positive. The `type` field (`income` or `expense`) sets the direction.
- A transaction's category must exist and match its type.
- Every transaction query is filtered by the logged-in user.
- The role is never accepted from the request body, so users can't make themselves admin.

## Author
Fahma Ali,  https://www.linkedin.com/in/fahma-ali-odoo