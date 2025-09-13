import "dotenv/config";         // automatically loads .env immediately

import Fastify from "fastify";
import cors from "@fastify/cors";  // ✅ new import
// import dotenv from "dotenv";
import { restaurantRoutes } from "./routes/restaurants";
// dotenv.config();


const server = Fastify({ logger: true });

server.register(cors, { origin: "*" });

server.get("/", async () => {
  return { message: "Backend is running 🚀" };
});

const start = async () => {
  try {
    await server.register(restaurantRoutes);
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
//AIzaSyCYn5DQF5jo4AwwVFTI8tU5DceUl3cXZio
start();