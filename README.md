# Discover Restaurants

A full-stack application for discovering restaurants using Google Places API, built with React (frontend) and Node.js/Fastify (backend).

## Features

- Restaurant search and discovery
- Interactive map integration
- Restaurant filtering and details
- Modern responsive UI

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Google Maps API
- **Backend**: Node.js, Fastify, TypeScript
- **APIs**: Google Places API

## Development Setup

### Prerequisites

- Node.js (v20 or higher)
- npm
- Google Places API key

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd discover-restaurants
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

3. Set up environment variables:
```bash
# Backend (.env file in backend directory)
GOOGLE_API_KEY=your_google_api_key_here

# Frontend (.env file in frontend directory)
VITE_API_BASE=http://localhost:3000
VITE_GOOGLE_API_KEY=your_google_api_key_here
```

4. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Docker Deployment

### Prerequisites

- Docker
- Docker Compose

### Quick Start with Docker

1. Clone the repository and navigate to the project directory:
```bash
git clone <repository-url>
cd discover-restaurants
```

2. Create environment file:
```bash
# Create .env file in the root directory
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
```

3. Build and start the services:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

### Docker Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build frontend
docker-compose build backend
```

### Individual Service Deployment

#### Backend Only
```bash
cd backend
docker build -t discover-restaurants-backend .
docker run -p 3000:3000 -e GOOGLE_API_KEY=your_key discover-restaurants-backend
```

#### Frontend Only
```bash
cd frontend
docker build -t discover-restaurants-frontend --build-arg VITE_API_BASE=http://localhost:3000 --build-arg VITE_GOOGLE_API_KEY=your_key .
docker run -p 8080:8080 discover-restaurants-frontend
```

## Environment Variables

### Backend
- `GOOGLE_API_KEY`: Your Google Places API key

### Frontend
- `VITE_API_BASE`: Backend API base URL (default: http://localhost:3000)
- `VITE_GOOGLE_API_KEY`: Your Google Places API key

## API Endpoints

- `GET /`: Health check endpoint
- `GET /restaurants`: Get restaurants (with query parameters for location, radius, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.