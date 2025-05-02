## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. Concurrently watches TypeScript files for changes and starts Firebase emulators for functions.

### `npm run build`

Copies the local environment variables and compiles the TypeScript code into JavaScript in the `dist` directory.

### `npm run build:prod`

Copies the production environment variables and compiles the TypeScript code into JavaScript in the `dist` directory.

### `npm run watch`

Runs TypeScript compiler in watch mode to automatically recompile when files change.

### `npm run serve`

Starts the Firebase emulators for functions.

### `npm run shell`

Builds the project and opens the Firebase functions shell for interactive testing and debugging.

### `npm run start`

Sets the TypeScript Node environment and starts Firebase emulators for functions.

### `npm run start:dev`

Sets the TypeScript Node environment, copies local environment variables, and starts Firebase emulators for functions.

### `npm run deploy`

Removes the dist directory, sets production environment, builds the project with production variables, and deploys the functions to your configured Firebase project.

### `npm run logs`

Fetches and displays Firebase functions logs.

### TypeORM Migrations & Schema

These scripts utilize TypeORM for database schema management. Ensure your database connection is configured in `app/config/database.ts`.

### `npm run typeorm`

Runs the TypeORM CLI with specified arguments.

### `npm run migration:generate --name=MigrationName`

Generates a new migration file based on changes detected between your entities and the current database schema. Replace `MigrationName` with a descriptive name for your migration (e.g., `AddUserEmail`).

### `npm run migration:run`

Applies all pending migrations to the database.

### `npm run migration:revert`

Reverts the last executed migration.

### `npm run schema:sync`

**Use with caution!** Synchronizes the database schema based on your entities. This can lead to data loss if not used carefully. It's generally recommended to use migrations for schema changes in production.

### `npm run schema:log`

Shows the SQL queries that `schema:sync` would execute without actually running them against the database. Useful for previewing changes.
