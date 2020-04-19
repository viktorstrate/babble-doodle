FROM node:13

# Setting working directory.
WORKDIR /app

# Installing dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

# Build source files
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]