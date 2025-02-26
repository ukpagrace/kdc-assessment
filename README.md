# Rate-Limited Notification System

A **Rate-Limited Notification System** that efficiently processes and delivers email/SMS notifications to users. The system handles high API traffic, queues tasks for asynchronous processing, and implements rate limiting to prevent abuse.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Docker & Docker Compose](https://www.docker.com/)

### 🔧 Installation & Setup

#### 1️⃣ Clone the repository
git clone <repo-url>
cd <repo-name>
#### 2️⃣ Create a .env file in the root directory and add the following:

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
POSTGRES_USER="johndoe"
POSTGRES_PASSWORD="randompassword"
POSTGRES_DB="mydb"
POSTGRES_HOST="postgres"
POSTGRES_PORT="5432"
#### 3️⃣ Start the services using Docker Compose

docker-compose up
#### 4️⃣ Run database migrations (if using Prisma)
```
npx prisma migrate dev
```
#### 5️⃣ Start the application
```
npm run start
```
## 📌 Features
- ✅ **Rate Limiting**: Prevents excessive API requests using `ThrottlerModule`.  
- ✅ **Queue System**: Uses BullMQ & Redis to handle job processing efficiently.  
- ✅ **Database Storage**: Notifications are stored in PostgreSQL.  
- ✅ **Asynchronous Processing**: Ensures smooth performance under high load.  


## 📡 API Endpoints
Method	Endpoint	Description
- POST	/notifications	Create and queue a notification
- GET	/notifications/user/{user_id}	Fetch last 10 notifications for a user
- GET	/notifications/status/{job_id}	Get status of a notification job

## 🛠 Technologies Used
- NestJS - Backend framework
- BullMQ - Job queue system
- Redis - In-memory database for queue management
- PostgreSQL - Relational database
- Prisma - Database ORM
- Docker - Containerization
- ThrottlerModule - API rate limiting

## 📜 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Developed by Uchechi 🚀


