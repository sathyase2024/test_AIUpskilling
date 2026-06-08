FROM node:22-alpine AS builder
WORKDIR /app
# Build context is the repo root — source files live in backend/
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
# Install language runtimes for the code execution sandbox
RUN apk add --no-cache python3 openjdk21-jdk
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# Bundle pre-generated lesson JSON so the seeder can seed on first boot
COPY generated_lessons ./generated_lessons
EXPOSE 3001
CMD ["node", "dist/main"]
