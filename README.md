# fullstack-Safe_Haven_Insurance

## Run in Docker 
Prerequisites
* Docker Desktop installed and running

Steps 
1. Open powershell
2. navigate to root folder `fullstack-Safe_Haven_Insurance` and 
3. run command: `docker-compose up --build`

### Test
Test will run automatically before build. If for some reason it fails (it shouldn't):
1. navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend` 
2. open `Docker` file
3. follow the instructions

## Manual Running
### Backend
Prerequisites
* installed jdk 21

Steps 
1. Open powershell
2. navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend`
3. run `.\mvnw spring-boot:run`

### Test
1. Open powershell
2. navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend` and 
3. run command: `.\mvnw test`

### Frontend
Prerequisites
* Installed Node js 24.15.0 LTS

Steps
1. Open powershell 
2. navigate to `fullstack-Safe_Haven_Insurance\safe-haven-frontend`and then run
3. `npm install`
4. `npm run dev`
   

