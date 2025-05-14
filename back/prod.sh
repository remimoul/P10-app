#!/bin/sh

# Generate Prisma client first
pnpm prisma generate

# Then run migrations
pnpm dlx prisma migrate deploy

# Start the application
node dist/main.js