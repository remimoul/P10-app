#!/bin/sh

echo "✅ Configuring pnpm..."
pnpm config set allow-scripts true

echo "📦 Installing dependencies..."
pnpm install

echo "🏁 Starting dev server..."
pnpm dev