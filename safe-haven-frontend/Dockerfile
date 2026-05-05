FROM node:24.15.0
WORKDIR /app
COPY package*.json ./
RUN echo "Installing frontend dependencies..."
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]