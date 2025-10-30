[![Node.js](https://img.shields.io/badge/node.js-24.10.0-339933.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/pnpm-10.19.0-F9AD0B?label=pnpm&style=flat&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![GitHub Release](https://img.shields.io/github/v/release/gucasassi/devcamp?label=release&style=flat)](https://github.com/gucasassi/devcamp/releases/latest)
[![Status](https://img.shields.io/github/actions/workflow/status/gucasassi/devcamp/release.yml?label=status&style=flat)](https://github.com/gucasassi/devcamp/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gucasassi_devcamp&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gucasassi_devcamp)

# DevCamp API

An API built entirely with **Node.js** and **Express** designed to streamline the administration and delivery of educational bootcamps and courses. This project serves as a comprehensive demonstration of building **scalable and secure** backend systems.

## 📋 Setup (Local Development)

Follow these steps to configure and run the project in your local environment.

### Prerequisites

Ensure your development environment has the following tools installed with the recommended versions:

- [Node.js](https://nodejs.org/): `v24.10.0` or greater.
- [PNPM](https://pnpm.io/): `v10.19.0` or greater.
- [Docker](https://www.docker.com/): Required to run the database locally.

Ready to get started? Just follow the next sections to [set up](#set-up) your environment.

### 1. Clone the Repository

Open your terminal and clone the project:

```sh
git clone https://github.com/gucasassi/devcamp-api.git && cd devcamp-api
```

### 2. Install Dependencies

Use PNPM to install all project dependencies:

```sh
pnpm i
```

### 3. Configure the Database (MongoDB)

To simplify local development, it is recommended to use the provided `docker-compose.yml` file to start **MongoDB** in a container. Start the database container:

```sh
docker compose up -d mongodb
```

> Note: The MongoDB instance will be accessible at mongodb://172.17.0.1:27017.

### 4. Environment Variables

Create a `.env` file in the project root to store your environment variables. Use the following example as a template:

```sh
NODE_ENV=development
APP_PORT=3000
# Ensure this URI matches your Docker container's address.
MONGO_URI=mongodb://172.17.0.1:27017/devcamp-api
```

### 5. Running the Project

Once the setup is complete, you can start the API in development mode:

```sh
# Starts the server using nodemon for automatic restarts.
pnpm dev
```

The API will be running at `http://localhost:3000` (or the port specified in your .env file).

## ▶️ Run with Docker

If you just want to test the API without a full local installation, you can directly run the [Docker](https://www.docker.com/) image from [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) (GHCR).

### 1. Get the Setup Files

You need the `docker-compose.yml` (for MongoDB) and create the `.env` file.

```sh
git clone https://github.com/gucasassi/devcamp-api.git && cd devcamp
```

Create the `.env` file.

```sh
nano .env
```

Content for `.env`:

```sh
NODE_ENV=production
APP_PORT=3000
MONGO_URI=mongodb://172.17.0.1:27017/devcamp-api
```

### 2. Start the Database

Ensure the `mongodb` container is running locally using `docker compose`:

```sh
docker compose up -d mongodb
```

### 3. Run the API

Pull and run the latest stable image of `devcamp-api`, mapping the application port `3000` and using your local `.env` file for configuration.

```sh
docker run -dit \
  -p 3000:3000 \
  --name devcamp-api \
  --env-file .env \
  ghcr.io/gucasassi/devcamp-api:latest
```

The API will be accessible at `http://localhost:3000`.
