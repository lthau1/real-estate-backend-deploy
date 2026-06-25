require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.error(`Error starting server: ${error}`);
    throw error;
  }
  console.log(`Server is running on port ${port}.`);
  console.log(`API:       http://localhost:${port}/api`);
  console.log(`API Docs:  http://localhost:${port}/api-docs`);
});
