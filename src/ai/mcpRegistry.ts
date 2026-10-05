/**
 * GS Collection Model Context Protocol (MCP) Tool Registry
 * Exposes safe, validated actions to AI agents without direct DB access.
 */

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
  permission: "PUBLIC" | "CUSTOMER" | "ADMIN";
}

export const GS_COLLECTION_MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "search_clothing_catalog",
    description:
      "Search children's garments by query, category, gender (BOYS, GIRLS, BABY), or maximum price in PKR.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword e.g. 'cotton t-shirt', 'summer dress'" },
        gender: { type: "string", enum: ["BOYS", "GIRLS", "BABY"], description: "Target department" },
        maxPrice: { type: "number", description: "Maximum price in PKR (e.g. 2500)" },
      },
    },
    permission: "PUBLIC",
  },
  {
    name: "check_garment_stock",
    description: "Verify live stock availability for a specific kids clothing size and color.",
    parameters: {
      type: "object",
      properties: {
        productId: { type: "string", description: "Unique product identifier" },
        sizeName: { type: "string", description: "Age size e.g. '4-5 Years'" },
        colorName: { type: "string", description: "Garment color e.g. 'Sky Blue'" },
      },
      required: ["productId", "sizeName", "colorName"],
    },
    permission: "PUBLIC",
  },
  {
    name: "track_delivery_status",
    description: "Look up delivery progress and courier status for an order number.",
    parameters: {
      type: "object",
      properties: {
        orderNumber: { type: "string", description: "e.g. 'GS-2026-8901'" },
      },
      required: ["orderNumber"],
    },
    permission: "PUBLIC",
  },
  {
    name: "get_admin_sales_metrics",
    description: "Retrieve high-level total sales, order volume, and store KPIs. Restricted to Store Admin.",
    parameters: {
      type: "object",
      properties: {},
    },
    permission: "ADMIN",
  },
];
