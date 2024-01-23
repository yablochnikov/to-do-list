## Getting Started

These instructions will help you set up and run the app on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installing

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yablochnikov/to-do-list.git
   ```

2. Change into the project directory:

   ```bash
   cd to-do-list
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

#### Start JSON Server

The app may require a JSON server to mock a backend. Follow these steps to start json-server:

1. Install json-server globally (if not installed):

   ```bash
   npm install -g json-server
   ```

2. Start json-server using the provided `db.json` file:

   ```bash
   json-server --watch db.json --port 3001
   ```

By default, the app may be configured to make API requests to `http://localhost:3001`. Adjust the configuration as needed.

#### Start the App

With the JSON server running, you can start the app:

```bash
npm start
```
