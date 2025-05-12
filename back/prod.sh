#!/bin/sh

pnpm dlx prisma migrate deploy

node dist/main.js