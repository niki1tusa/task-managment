# TaskHub — Next.js + Supabase  
> Production-ready task+chat demo: channels (group/task/direct), realtime messages, participants & roles, tasks/subtasks — built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Supabase** (Postgres / Auth / Realtime / Storage).

---

[![Vercel](https://img.shields.io/badge/deploy-vercel-000000?logo=vercel)](#) [![Supabase](https://img.shields.io/badge/backend-supabase-3ECF8E?logo=supabase)](#) [![TypeScript](https://img.shields.io/badge/lang-typescript-3178C6?logo=typescript)](#)

---

## Quick summary
This repository is a compact full-stack app that demonstrates a real-world architecture:
- Frontend: **Next.js (App Router)** + React + **TypeScript** + **Tailwind CSS v4**
- Backend: **Supabase** (Postgres, Auth, Realtime, Storage)
- Data fetching: **Tanstack/React Query**
- Client state: **Zustand**
- Forms & validation: **react-hook-form** + **Zod**
- Realtime: Supabase `postgres_changes` channels

Features: auth (magic link/email), profiles, tasks & participants, multi-type channels, RLS & DB triggers, realtime chat messages.

---

## Table of contents
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Supabase setup](#supabase-setup)
- [Database snippets (recommended)](#database-snippets-recommended)
- [Development workflow](#development-workflow)
- [Architecture notes & gotchas](#architecture-notes--gotchas)
- [Deployment](#deployment)
- [License](#license)

---

## Quick start

1. Clone repo
```bash
git clone https://github.com/niki1tusa/task-managment.git
cd task-managment

--- 
## Generated type db
https://supabase.com/docs/guides/api/rest/generating-types
