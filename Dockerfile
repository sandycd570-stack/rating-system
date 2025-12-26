FROM node:22-alpine

LABEL "language"="nodejs"
LABEL "framework"="react"

WORKDIR /src

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

