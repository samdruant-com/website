# Source Code (src)

This directory stores the source code for the backend. The source code is written in Typescript and compiled to Javascript before being run.

This directory contains the following files:

- `index.ts` - This file connects to the database and starts the Express server.
- `app.ts` - This file creates the Express app and configures it to use middleware and routes installed from libraries or defined in other subdirectories.
- `database.ts` - This file establishes and exports a connection to the database.

The remainder of this directory is organized into subdirectories, each of which is described with a README.md file in the subdirectory.
