## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

You will have to reload the page when you make changes.\

### `npm run build`

Compiles the TypeScript code into JavaScript in the `dist` directory.

### `npm run serve`

Builds the project and starts the Firebase emulators for functions. This is the command run by `npm start`.

### `npm run shell`

Builds the project and opens the Firebase functions shell for interactive testing and debugging.

### `npm run deploy`

Deploys the functions to your configured Firebase project.

### `npm run logs`

Runs the application using `ts-node-dev`. This provides automatic restarts when code changes are detected, speeding up development. Note: This typically doesn't use the Firebase emulator environment unless configured separately.

### TypeORM Migrations & Schema

These scripts utilize TypeORM for database schema management. Ensure your database connection is configured in `app/config/database.ts`.

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
