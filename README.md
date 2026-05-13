# SafeHaven Insurance - Admin Panel

## Project Overview
This project is an internal, web-based admin panel designed for the fictional SafeHaven Insurance company to manage its insurance product catalog.

### Main Features
* **Catalog Browsing**: View all insurance products and their current status.
* **Product Management**: Create, edit, and delete insurance products such as "Travel Safe Plus" or "Home Protect Basic".
* **Cover Management**: Add, edit, and remove specific covers within each product (e.g., Medical Expenses, Baggage Loss).
* **Status Control**: Activate or deactivate products within the catalog.

---

## Tech Stack

### Backend
* **Java 21**: Spring Boot 4.1.0-RC1.
* **RESTful API**: Exposing endpoints for full CRUD operations.
* **H2 Database**: A relational in-memory database used for data persistence during runtime.

### Frontend
* **React**: Built with JavaScript.
* **API Communication**: Interaction with the backend via Axios.
* **UI**: A clean, functional admin layout using Bootstrap 5 framework.

### Testing & Tools
* **Unit Tests**: Partial test coverage for the service and controller layers using JUnit 6 and Mockito for unit tests, MockMvc and SpringBootTest for integration tests.
* **API Verification**: Functional testing performed via **Postman**. 

---

## Setup and Execution

### Option 1: Run with Docker 
**Prerequisites**
* Docker Desktop installed and running.

**Steps**
1. Open PowerShell.
2. Navigate to the root folder: `fullstack-Safe_Haven_Insurance`.
3. Run the command: `docker-compose up --build`

#### Testing
Tests run automatically before the build. If a manual check is required:
1. Navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend`.
2. Open the `Docker` file.
3. Follow the internal instructions.

---

### Option 2: Manual Execution

#### Backend
**Prerequisites**
* JDK 21 installed.

**Steps**
1. Open PowerShell.
2. Navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend`.
3. Run: `.\mvnw spring-boot:run`

**Run Tests**
1. Open PowerShell.
2. Navigate to `fullstack-Safe_Haven_Insurance\safe-haven-backend`.
3. Run: `.\mvnw test`

#### Frontend
**Prerequisites**
* Node.js v24.15.0 LTS installed.

**Steps**
1. Open PowerShell. 
2. Navigate to `fullstack-Safe_Haven_Insurance\safe-haven-frontend`.
3. Run: `npm install`
4. Run: `npm run dev`

---

## Application Access
Please allow approximately **10 seconds** for all services to initialize completely before accessing the link below:
* **Website**: [http://localhost:3000/](http://localhost:3000/)

## Database Access
You can access the H2 console to inspect the in-memory data:
* **H2 Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

**Credentials:**
* **JDBC URL**: `jdbc:h2:mem:SafeHavenDB`
* **Username**: `tester`
* **Password**: *(Leave empty)*