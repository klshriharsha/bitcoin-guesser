# Bitcoin server

The web app server is built on the following tech stack:

-   **Language**: TypeScript
-   **Library/Framework**: Express
-   **Build system**: TypeScript compiler
-   **Linter and formatter**: ESLint, Prettier
-   **Database**: MongoDB
-   **ORM**: Prisma

### Architecture

The server code is separated into controllers, routers, services and validators

-   **Controllers**: They handle the HTTP request/response and delegate the core functionality to services
-   **Validators**: They are utilities that help in validating the HTTP requests
-   **Services**: They implement the core functionality. They also interact with the database via the ORM (prisma)
