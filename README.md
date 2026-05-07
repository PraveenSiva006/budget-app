# Budget App

A modern full-stack personal finance and budgeting platform built with a production-oriented monorepo architecture.

This project focuses on:

- Scalable frontend architecture
- Clean backend design
- Type-safe contracts
- Maintainable financial domain modeling
- Production-ready developer workflows

> 🚧 **Work In Progress**  
> This project is actively under development.  
> Features, architecture, APIs, and database models may evolve rapidly.

---

# Tech Stack

## Frontend

- React 19
- Vite
- TypeScript
- React Router v7
- React Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS v4
- shadcn/ui
- Radix UI

## Backend

- NestJS 11
- Prisma ORM
- PostgreSQL
- Zod Validation

## Monorepo & Tooling

- Turborepo
- pnpm Workspaces
- ESLint Flat Config
- Prettier
- Shared Type Packages

---

# Monorepo Structure

```txt
budget-app/
│
├── apps/
│   ├── frontend/        # React frontend
│   └── backend/         # NestJS backend
│
├── packages/
│   └── types/           # Shared TypeScript types/contracts
│
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

# Architecture Goals

- Production-grade frontend architecture
- Clean backend separation
- Shared type-safe contracts
- Scalable domain-driven structure
- Strong TypeScript boundaries
- Reusable UI primitives
- Maintainable financial domain modeling
- Developer experience focused workflow

---

# Current Features

## Authentication Foundation

- User model
- Environment configuration
- JWT configuration groundwork

## Accounts

Supports multiple financial account types:

- Cash
- Bank
- Credit Card
- Wallet

## Transactions

Supports:

- Income transactions
- Expense transactions
- Transfer transactions

## Budgeting

- Monthly budgets
- Category-wise budget limits
- Financial categorization system

## Infrastructure

- Prisma integration with NestJS lifecycle
- PostgreSQL migrations
- Shared workspace packages
- Strict TypeScript setup
- ESLint flat configuration

---

# Database Models

## Core Entities

- User
- Account
- Category
- Transaction
- MonthlyBudget
- BudgetCategoryLimit

## Account Types

```ts
enum AccountType {
  CASH,
  BANK,
  CREDIT_CARD,
  WALLET
}
```

## Transaction Types

```ts
enum TransactionType {
  INCOME,
  EXPENSE,
  TRANSFER
}
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js v20+
- pnpm
- PostgreSQL
- Git

Verify installation:

```bash
node -v
pnpm -v
git --version
psql --version
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd budget-app
```

## Install Dependencies

```bash
pnpm install
```

---

# Environment Variables

Create the following file:

```txt
apps/backend/.env
```

Example configuration:

```env
PORT=3000

DATABASE_URL="postgresql://postgres:password@localhost:5432/budget_db"

JWT_SECRET="dev-super-secret-key"

JWT_EXPIRES_IN="7d"
```

---

# Database Setup

## Create Database

```sql
CREATE DATABASE budget_db;
```

## Run Prisma Migrations

```bash
cd apps/backend

pnpm prisma migrate dev
```

## Generate Prisma Client

```bash
pnpm prisma generate
```

---

# Running the Project

## Run Entire Monorepo

```bash
pnpm dev
```

## Frontend

```bash
cd apps/frontend
pnpm dev
```

## Backend

```bash
cd apps/backend
pnpm start:dev
```

---

# Build

```bash
pnpm build
```

# Lint

```bash
pnpm lint
```

---

# Design Principles

This project emphasizes:

- Type safety first
- Explicit boundaries
- Feature-oriented frontend design
- Infrastructure isolation
- Predictable state management
- Production-oriented scalability
- Clean developer ergonomics

---

# Planned Features

- Authentication & authorization
- Recurring transactions
- Bank statement import
- Auto-categorization engine
- Dashboard analytics
- Multi-currency support
- Budget forecasting
- Transaction search & filters
- Charts & reporting
- Notifications
- PWA support
- Offline-first capabilities
- AI-assisted financial insights

---

# Development Status

| Module | Status |
|---|---|
| Monorepo Setup | ✅ |
| Frontend Foundation | ✅ |
| Backend Foundation | ✅ |
| Prisma Integration | ✅ |
| Database Modeling | ✅ |
| Authentication | 🚧 |
| Budget Engine | 🚧 |
| Analytics | 🚧 |
| Statement Import | 🚧 |
| Production Deployment | 🚧 |

---

# Notes

This repository is being built with long-term scalability and maintainability in mind.

The architecture and folder structure may continue evolving as the domain grows.

---

# License

License to be decided.
Currently private and proprietary.
