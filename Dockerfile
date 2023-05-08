FROM node:latest as builder
COPY . /app/
RUN cd /app && ls -la && yarn install && yarn build
RUN node -v

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80



