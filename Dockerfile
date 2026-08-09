# syntax=docker/dockerfile:1

# ============================================================
# Stage 1 — Build Frontend
# ============================================================
FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm ci --legacy-peer-deps

COPY frontend/ ./

# Same-origin production API
ENV VITE_API_URL=/api
ENV VITE_APP_URL=https://calenso.thinkpixel.org

RUN npm run build


# ============================================================
# Stage 2 — Build Backend + Prisma
# ============================================================
FROM node:22-bookworm-slim AS backend-builder

WORKDIR /app/backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        openssl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./

# Prisma CLI is a devDependency and is required for generate
RUN npm ci

COPY backend/ ./

RUN npx prisma generate

# Remove development dependencies after Prisma generation
RUN npm prune --omit=dev


# ============================================================
# Stage 3 — Production Runtime
# ============================================================
FROM node:22-bookworm-slim AS production

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        dumb-init \
        openssl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Non-root user
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nodejs

# Backend
COPY --from=backend-builder /app/backend/package*.json ./backend/
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/src ./backend/src
COPY --from=backend-builder /app/backend/middleware ./backend/middleware
COPY --from=backend-builder /app/backend/actions ./backend/actions
COPY --from=backend-builder /app/backend/lib ./backend/lib
COPY --from=backend-builder /app/backend/prisma ./backend/prisma

# Frontend production build
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Runtime logs
RUN mkdir -p /app/logs \
    && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s \
    --timeout=10s \
    --start-period=40s \
    --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000/api/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "backend/src/index.js"]
