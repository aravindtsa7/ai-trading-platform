# AI Trading Platform - Database Design

## Version
1.0

## Database
MySQL 8

## ORM
Prisma

---

# Domain 1 - Identity & Authentication

## users

Purpose:
Stores platform users.

Relationships:
- One User -> Many Broker Accounts
- One User -> Many Strategies
- One User -> Many Notifications
- One User -> Many Backtests

Fields (Draft):
- id
- firstName
- lastName
- email
- passwordHash
- phone
- status
- role
- createdAt
- updatedAt

---

## refresh_tokens

Purpose:
Stores JWT refresh tokens.

Relationships:
- Many Tokens -> One User

---

# Domain 2 - Broker Management

## brokers

Purpose:
Master list of supported brokers.

Examples:
- Upstox
- Groww
- Fyers

---

## broker_accounts

Purpose:
Represents a user's linked broker account.

Relationships:
- Many Broker Accounts -> One User
- Many Broker Accounts -> One Broker

---

## broker_credentials

Purpose:
Encrypted API credentials.

Relationships:
- One Broker Account -> One Credential

---

# Domain 3 - Market Data

## instruments

Purpose:
Master instrument list.

Examples:
- NIFTY
- BANKNIFTY
- RELIANCE

---

## market_quotes

Purpose:
Latest market prices.

---

## historical_candles

Purpose:
OHLC historical data.

---

## option_chains

Purpose:
Option chain snapshots.

---

# Domain 4 - Trading

## orders

Purpose:
Executed orders.

---

## positions

Purpose:
Open and closed positions.

---

## holdings

Purpose:
Delivery holdings.

---

## trades

Purpose:
Executed trades.

---

# Domain 5 - Strategy

## strategies

Purpose:
User-created strategies.

---

## strategy_runs

Purpose:
Every execution of a strategy.

---

# Domain 6 - AI

## ai_models

Purpose:
Registered AI models.

---

## ai_predictions

Purpose:
AI-generated trade signals.

---

# Domain 7 - Paper Trading

## paper_accounts

Purpose:
Virtual trading account.

---

## paper_orders

Purpose:
Paper trading orders.

---

## paper_positions

Purpose:
Paper trading positions.

---

# Domain 8 - Backtesting

## backtests

Purpose:
Backtest execution history.

---

## backtest_results

Purpose:
Performance metrics.

---

# Domain 9 - Risk

## risk_profiles

Purpose:
Risk configuration.

---

## risk_events

Purpose:
Risk violations.

---

# Domain 10 - Notifications

## notifications

Purpose:
System notifications.

---

# Domain 11 - Audit

## audit_logs

Purpose:
Security and activity logs.

---

# Domain 12 - Settings

## settings

Purpose:
Application and user settings.