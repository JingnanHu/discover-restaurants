/**
 * Restaurant Type Definitions
 * 
 * This module defines the TypeScript interfaces and types used throughout
 * the restaurant discovery application for type safety and consistency.
 * 
 * Types:
 * - Restaurant: Main interface representing a restaurant with all its properties
 * 
 * Properties:
 * - id: Unique identifier from Google Places API
 * - name: Restaurant name
 * - address: Full formatted address
 * - rating: Average rating (1-5 stars)
 * - photo: URL to restaurant photo
 * - phone: Formatted phone number
 * - website: Restaurant website URL
 * - opening_hours: Array of opening hours strings
 * - location: Geographic coordinates (lat, lng)
 * - price: Price level (0-4)
 * - priceLabel: Human-readable price description
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating?: number;
  photo?: string;
  phone?: string;
  website?: string;
  opening_hours?: string[];
  location?: { lat: number; lng: number };
  price?: number;
  priceLabel: string;
}