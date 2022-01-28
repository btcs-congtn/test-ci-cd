FROM node:16-alphine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn run build

FROM node:16
EXPOSE 3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

CMD [ "yarn", "run", "start:prod" ]