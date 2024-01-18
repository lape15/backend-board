//server.js
import app from "./app";
const port = process.env.NODE_DOCKER_PORT || 8080; //Line 3
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
