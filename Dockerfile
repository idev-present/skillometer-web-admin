FROM --platform=linux/amd64 node:lts-iron as builder

ARG ENV=development
ENV NODE_ENV=development

# Configure app directory
WORKDIR /usr/local/app

# Install app dependencies
COPY package.json package-lock.json ./

# Build
RUN npm cache clean --force
RUN npm install

COPY . .

RUN cp .env.${ENV} .env
RUN npm run build:$ENV

###############################################################################

FROM --platform=linux/amd64 nginx:stable-alpine as prod

WORKDIR /app

COPY --from=builder /usr/local/app/dist /app/dist

COPY provision/conf/nginx.conf /etc/nginx/nginx.conf
