![Animation](https://github.com/user-attachments/assets/cab32fa0-d14b-40d8-8b5f-6468e263fbf6)

Each service is a separate folder, and Kubernetes manifests are stored in the `infra/k8s` directory.

## Technologies Used

- **Node.js**: Backend framework used for the microservices.
- **Express.js**: Web framework used to create APIs for user, hotel, and reservation services.
- **MongoDB**: Database used to store user, hotel, and reservation data.
- **Redis**: In-memory data store used for caching and pub/sub.
- **Elasticsearch**: Used for efficient searching in the hotel service.
- **Kubernetes**: Used for container orchestration and managing microservices.
- **Docker**: Containerization of all services.
- **NGINX**: Ingress controller for routing traffic to services.
- **JWT**: Token-based authentication.
- **React.js**: Frontend framework used for the client service.

## Services Overview

### User Service
Manages user registration, login, and profile retrieval. Each user is authenticated using JWT. The user data is stored in MongoDB.

**Features**:
- User registration and authentication
- JWT-based authentication
- User profile caching with Redis

### Hotel Service
Manages hotel information, including creating, updating, and deleting hotel listings. It also integrates with Elasticsearch for efficient hotel searches.

**Features**:
- CRUD operations for hotels
- Elasticsearch integration for hotel search
- Redis for caching viewed hotels

### Reservation Service
Handles hotel reservation functionality. Reservations are stored in MongoDB, and Redis is used to cache and publish reservation data.

**Features**:
- Create and manage reservations
- Pub/Sub mechanism using Redis
- Fetch last reservation and reservation by ID

### Client Service
The frontend for the hotel reservation system, built with React.js. It provides a user-friendly interface for searching hotels, making reservations, and managing profiles.

## Deployment

### Kubernetes Resources

1. **Deployments**: Each service (user, hotel, reservation, and client) has its own Kubernetes Deployment resource. Elasticsearch and Redis are also deployed in the Kubernetes cluster.
2. **Services**: ClusterIP services are created for each microservice to enable internal communication.
3. **Ingress**: An NGINX Ingress controller is used to route traffic to the appropriate services based on URL paths.

### Kubernetes Files:
- **Deployment YAML Files**:
  - `client-depl.yaml`
  - `user-service-depl.yaml`
  - `hotel-service-depl.yaml`
  - `reservation-service-depl.yaml`
  - `redis-depl.yaml`
  - `elasticsearch-depl.yaml`
- **Service YAML Files**:
  - `client-srv.yaml`
  - `user-service-srv.yaml`
  - `hotel-service-srv.yaml`
  - `reservation-service-srv.yaml`
  - `redis-srv.yaml`
  - `elasticsearch-srv.yaml`
- **Ingress**:
  - `ingress.yaml`



## Environment Variables

Each service requires specific environment variables to function:

- `MONGO_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection string (e.g., `redis://redis:6379`)
- `JWT_SECRET`: Secret key used to sign JWT tokens
- `ELASTICSEARCH_URL`: Elasticsearch endpoint (e.g., `http://elasticsearch-service:9200`)

