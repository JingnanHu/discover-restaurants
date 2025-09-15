import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { restaurantRoutes } from "./routes/restaurants";

const server = Fastify({ logger: true });
server.register(cors, { origin: "*" });

server.get("/", async () => {
  return { message: "Backend is running 🚀" };
});

const start = async () => {
  try {
    await server.register(restaurantRoutes);
    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info("Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();