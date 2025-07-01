# MyggTradeX

MyggTradeX is a web-based trading platform that allows users to manage their stock portfolios, receive real-time trade alerts, and view live market data. The platform is built with a modern technology stack, featuring a FastAPI backend, a React frontend, and a PostgreSQL database. It also integrates with n8n for workflow automation, enabling real-time alerts and data processing.

## Features

- **User Authentication:** Secure user authentication with JWT tokens.
- **Portfolio Management:** Create, view, and manage your stock portfolio.
- **Real-Time Alerts:** Receive live trade alerts via WebSockets.
- **Market Data:** View real-time market data for various symbols.
- **Workflow Automation:** n8n integration for automated data processing and alerts.

## Technology Stack

### Backend

- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **SQLAlchemy:** The Python SQL toolkit and Object Relational Mapper.
- **PostgreSQL:** A powerful, open-source object-relational database system.
- **Uvicorn:** A lightning-fast ASGI server implementation.
- **WebSockets:** For real-time communication between the server and clients.

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **React Scripts:** A set of scripts and configurations for React applications.
- **Web Vitals:** For measuring and reporting on the performance of your site.

### DevOps

- **Docker:** For containerizing and deploying the application.
- **n8n:** A workflow automation tool for connecting and automating various services.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Python 3.7+
- Node.js

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/MyggTradeX.git
   ```

2. **Set up the environment variables:**

   - Create a `.env` file in the `backend` directory and add the following:

     ```
     DATABASE_URL=postgresql://myggtradex:secretasfuck@db/tradingdb
     SECRET_KEY=your-secret-key
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=30
     ```

   - Create a `.env` file in the `n8n` directory and add the following:

     ```
     DATA_FOLDER=/home/node/.n8n
     DOMAIN_NAME=your-domain.com
     SUBDOMAIN=n8n
     SSL_EMAIL=your-email@example.com
     GENERIC_TIMEZONE=Europe/London
     ```

3. **Run the application:**

   ```bash
   docker-compose -f docker/docker-compose.yml -f n8n/docker-compose.yml up -d
   ```

4. **Run the backend:**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

5. **Run the frontend:**

   ```bash
   cd frontend
   npm install
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create a new user account or log in with an existing account.
3. Start managing your portfolio, viewing trade alerts, and exploring the platform's features.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.
