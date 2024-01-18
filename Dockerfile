FROM node:14

WORKDIR /job-board-backend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
EXPOSE 5000