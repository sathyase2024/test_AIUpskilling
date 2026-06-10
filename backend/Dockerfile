FROM node:22-alpine AS builder
WORKDIR /app
# Build context is the repo root — source files live in backend/
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
# Install language runtimes for the code execution sandbox.
# Python scientific libs come from Alpine's prebuilt py3-* packages (musl
# wheels) — pip would compile numpy/scipy/pandas from source on Alpine.
RUN apk add --no-cache python3 openjdk21-jdk g++ go \
    py3-numpy py3-pandas py3-scikit-learn py3-scipy py3-matplotlib py3-seaborn \
    py3-pip && \
    pip3 install --no-cache-dir --break-system-packages psutil
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# Bundle pre-generated lesson JSON so the seeder can seed on first boot
COPY generated_lessons ./generated_lessons
EXPOSE 3001
CMD ["node", "dist/main"]
