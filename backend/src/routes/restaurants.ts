import { FastifyInstance } from "fastify";
import { fetchRestaurants, fetchRestaurantDetails } from "../services/googlePlaces";

export async function restaurantRoutes(fastify: FastifyInstance) {
  // Static location example (Geneva city center)
  // const defaultLat = 46.2044;
  // const defaultLng = 6.1432;
  
  fastify.get("/restaurants", async (request, reply) => {
    try {
      const { lat, lng, radius } = request.query as { lat?: string; lng?: string; radius?: string };

      // Use query values if provided, otherwise fallback to default
      if (!lat || !lng) {
        reply.status(400).send({ error: "Latitude and longitude are required" });
        return;
      }

      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const searchRadius = radius ? parseInt(radius) : 2000;
      const restaurants = await fetchRestaurants(latitude, longitude, searchRadius);
      return restaurants;
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch restaurants" });
    }
  });

  fastify.get("/restaurants/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const details = await fetchRestaurantDetails(id);
      return details;
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch restaurant details" });
    }
  });
}
