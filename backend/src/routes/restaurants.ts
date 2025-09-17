/**
 * Restaurant Routes
 * 
 * This module defines the REST API routes for restaurant-related operations.
 * It provides endpoints for fetching nearby restaurants and detailed restaurant information.
 * 
 * Routes:
 * - GET /restaurants - Fetch nearby restaurants by location and radius
 * - GET /restaurants/:id - Fetch detailed information for a specific restaurant
 * 
 * Query Parameters:
 * - lat: Latitude coordinate (required)
 * - lng: Longitude coordinate (required) 
 * - radius: Search radius in meters (optional, default: 2000)
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { FastifyInstance } from "fastify";
import { fetchRestaurants, fetchRestaurantDetails } from "../services/googlePlaces";

interface RestaurantQuery { Querystring: { lat: string; lng: string; radius?: string } }
interface RestaurantParams { Params: { id: string } }

export async function restaurantRoutes(fastify: FastifyInstance) {
  fastify.get<RestaurantQuery>("/restaurants", async (request, reply) => {
    try {
      const { lat, lng, radius } = request.query;
      if (!lat || !lng) return reply.status(400).send({ error: "Latitude and longitude are required" });
      return fetchRestaurants(parseFloat(lat), parseFloat(lng), radius ? parseInt(radius) : 2000);
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: err instanceof Error ? err.message : "Failed to fetch restaurants" });
    }
  });

  fastify.get<RestaurantParams>("/restaurants/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      return fetchRestaurantDetails(id);
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: err instanceof Error ? err.message : "Failed to fetch restaurants" });
    }
  });
}