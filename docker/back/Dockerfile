# ---- Build Stage ----
FROM node:23-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY ./back/package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY ./back .

# Compiler l'application
RUN npm run build

# ---- Production Stage ----
FROM node:23-alpine AS production

WORKDIR /app

# Définir les variables d'environnement
ENV NODE_ENV=production

# Copier les fichiers de dépendances et installer uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production

# Copier les fichiers compilés depuis l'étape de build
COPY --from=builder /app/dist ./dist

# Exposer le port sur lequel fonctionne votre application NestJS
EXPOSE 4500

# Démarrer l'application
CMD ["node", "dist/main"]