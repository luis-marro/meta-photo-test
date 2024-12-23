# Node.js + TypeScript Domain-Driven Design Project

This is a Node.js application built with TypeScript, following the principles of **Domain-Driven Design (DDD)**. The project implements a modular architecture, separating the domain, application, and infrastructure layers for better maintainability and scalability.

This project represents a simple use case to provide MetaPhoto with enriched functionality.

---

## **Features**

- **Domain-Driven Design (DDD):** Clear separation of concerns between domain, application, and infrastructure layers.
- **Express.js API Layer:** Handles routes and controllers.
- **Internal API Integration:** Fetches and enriches data from mock APIs (`jsonplaceholder.typicode.com`).
- **TypeScript:** Strongly typed codebase for better reliability.
- **Docker Support:** Easily containerized for cloud deployment.

---

## **Tools Used**

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for handling HTTP requests.
- **TypeScript**: Static typing for JavaScript.
- **Axios**: HTTP client for API integration.
- **Docker**: Containerization for deployment.
- **Nodemon**: Development server that auto-restarts on file changes.
- **ts-node**: Run TypeScript directly without pre-compiling.

---

## **Project Structure**

```plaintext
project-root/
├── src/
│   ├── api/                  # API layer
│   │   ├── routes/           # Route definitions
│   │   │   └── UserRoutes.ts
│   │   ├── controllers/      # Controller logic
│   │   │   └── UserController.ts
│   ├── application/          # Application layer
│   │   └── services/         # Application services
│   │       └── InternalUserService.ts
│   ├── domain/               # Domain layer
│   │   └── entities/         # Domain models
│   │       ├── User.ts
│   │       ├── Album.ts
│   │       └── Photo.ts
│   └── server.ts             # Entry point for the app
├── Dockerfile                # Docker setup for production
├── package.json              # Node.js dependencies
├── tsconfig.json             # TypeScript configuration
├── .dockerignore             # Files ignored by Docker
├── .gitignore                # Files ignored by Git
```

## **How to run the application**

1. Install the dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Access the app at http://localhost:3000

### **Running the application in a Docker Container**

1. Build the Docker image: `docker build -t node-ddd-app .`
2. Run the Docker container: `docker run -d -p 3000:3000 --name node-ddd-app node-ddd-app`

### Clean up the Docker resources
1. Stop the container: `docker stop node-ddd-app`
2. Remove the container: `docker rm node-ddd-app`
3. Remove the Docker image: docker rmi node-ddd-app`

## **Accessing the Cloud Application**
- The deployed application can be accessed at [this link](https://meta-photo-test-863610494883.us-central1.run.app)
- A CI/CD Pipeline is implemented using GCO Cloud Build, which triggers automatically on every commit to main.

## **Interact with the API + LLM Interaction**

- A Colab Python notebook can be found at [this link](https://colab.research.google.com/drive/1b53gt-AAYZfa623T13qZgj_6AP4Wh3lP?usp=sharing) where the API presented in this readme can be interacted with, as well with a short example of an LLM interaction. This is an example of what such would look like:
- Prompt: Write a photo short description for an art gallery including the photo and album title, and the artis name.
- Results:
- Query for: artist: Leanne Graham, album: quidem molestiae enim, photo title: accusamus beatae ad facilis cum similique qui sunt
- ```In a dance of shadows and light, Leanne Graham captures the sublime, intertwining the real with the fantastical. "Accusamus Beatae ad Facilis Cum Similique Qui Sunt" invites the viewer into a realm where emotion flows like water, mirroring the complexities of human experience. Each brushstroke whispers secrets, pulling us into a tapestry of connection and disconnection, reflecting both the anguish and beauty that coexist within. Here, in this moment frozen in time, we are reminded that every surface holds a deeper story waiting to be uncovered. 33```


