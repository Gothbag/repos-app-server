# repos-app-server

This is the back-end to my **repos-app**. It uses local memory SQLite in order to track the repositories that the user wishes to track.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the development server with port 3001:<br />
**http://localhost:3001**

There's an endpoint available (which will only work after tracking a repo from the client-side application):

#### /api/repos

It returns the tracked repos stored in the database.

