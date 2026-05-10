# DATABASE SETUP GUIDE - Chapter 6

> **Note:** Hướng dẫn này dành cho local development. Deployment dùng Vercel PostgreSQL.

## 📋 Bước Setup Database

### **Option A: SQLite (Easiest - for local learning)**

SQLite không cần setup, file-based database, tự động tạo:

```bash
# 1. Install Prisma (optional but recommended)
npm install @prisma/client @prisma/cli

# 2. Setup Prisma
npx prisma init

# 3. Create .env.local với:
DATABASE_URL="file:./prisma/dev.db"

# 4. Create prisma/schema.prisma
# 5. Run migrations
npx prisma migrate dev --name init

# 6. Seed database
npx prisma db seed
```

---

### **Option B: PostgreSQL Local**

Yêu cầu: PostgreSQL cài sẵn

```bash
# 1. Create database
createdb nextjs_dashboard

# 2. Add to .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/nextjs_dashboard"

# 3. Setup & seed (same as SQLite Option A)
```

---

### **Option C: Vercel PostgreSQL (Production)**

```bash
# 1. Deploy to Vercel: https://vercel.com
# 2. Create Postgres DB từ Storage tab
# 3. Copy .env.local từ Vercel dashboard
# 4. Push to GitHub & auto-deploy
```

---

## 🎯 Recommended Setup for Learning:

**SQLite** - Không cần setup, learn fundamentals
↓ Later
**PostgreSQL** - Production-ready, learn advanced topics
↓ Later  
**Vercel DB** - Deploy & scale

---

## 📝 Next Steps:

1. Choose database option (A/B/C)
2. Install required packages
3. Setup .env.local
4. Run seed script
5. Verify data with query test

---

## ⚠️ Important:

- **Never commit .env.local** - add to .gitignore
- **Database secrets** should be environment variables only
- **SQLite** good for dev, **PostgreSQL** for production
