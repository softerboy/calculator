# syntax=docker/dockerfile:1
# Production image: the CRA build output served by Caddy's static file server.
# The runtime layer holds only the compiled build/ — no source, no node_modules.

# ---- build ----
# react-scripts 3 + node-sass 4.14 predate Node 16 (no prebuilt node-sass
# binaries, and webpack 4 breaks on Node 17+'s OpenSSL 3), so pin Node 14.
FROM node:14-bullseye AS build
# Husky 4 tries to install git hooks on install; there's no .git in the build.
ENV HUSKY_SKIP_INSTALL=1
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# ---- runtime ----
FROM caddy:2-alpine
COPY --from=build /app/build /srv
# Plain HTTP; TLS is terminated by the edge proxy in front of the box.
EXPOSE 8080
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":8080"]
