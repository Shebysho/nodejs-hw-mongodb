import app from "./server.js";
import http from "http";
import initMongoDB from './db/initMongoConnection.js';
import 'dotenv/config';


const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initMongoDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
