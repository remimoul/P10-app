#!/bin/sh

# Run migrations (client is already generated at build time)
pnpm dlx prisma migrate deploy

# Start the application
node dist/main.js