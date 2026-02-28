# Stage 1: Cài đặt dependencies
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Cài đặt pnpm toàn cục
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy file định nghĩa package để install
COPY package.json pnpm-lock.yaml* ./

# Cài đặt dependencies (bao gồm cả devDeps để build)
RUN pnpm i --frozen-lockfile

# Stage 2: Build source code
FROM node:24-alpine AS builder
WORKDIR /app

# Cài đặt pnpm cho stage builder
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry disabled [cite: 11]
ENV NEXT_TELEMETRY_DISABLED 1

# Thực hiện build dự án
RUN pnpm run build

# Stage 3: Runner (Image cuối cùng để deploy)
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Chỉ copy những thứ cần thiết để chạy standalone 
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Chạy bằng server.js được sinh ra từ output: 'standalone'
CMD ["node", "server.js"]