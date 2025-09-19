FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./

# If package-lock.json exists, run npm ci; otherwise, fallback to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi


COPY . .
RUN npm run build

FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs
EXPOSE 4000
CMD ["node", "dist/index.js"]



