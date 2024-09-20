# Build aşaması
FROM node:alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Production aşaması
FROM node:alpine
WORKDIR /app
COPY --from=build /app/dist /app
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", ".", "-l", "5173"]
