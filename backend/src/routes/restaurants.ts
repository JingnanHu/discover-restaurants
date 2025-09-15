import { FastifyInstance } from "fastify";
import { fetchRestaurants, fetchRestaurantDetails } from "../services/googlePlaces";

export async function restaurantRoutes(fastify: FastifyInstance) {
  fastify.get("/restaurants", async (request, reply) => {
    try {
      const { lat, lng, radius } = request.query as { lat?: string; lng?: string; radius?: string };
      if (!lat || !lng) return reply.status(400).send({ error: "Latitude and longitude are required" });
      return fetchRestaurants(parseFloat(lat), parseFloat(lng), radius ? parseInt(radius) : 2000);
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch restaurants" });
    }
  });

  fastify.get("/restaurants/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      return await fetchRestaurantDetails(id);
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch restaurant details" });
    }
  });
}
