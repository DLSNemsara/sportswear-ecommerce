FROM  node:latest AS builder
 
WORKDIR /admin
 
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]