import { NextResponse } from "next/server";
import { GS_COLLECTION_MCP_TOOLS } from "@/ai/mcpRegistry";
import { ProductService } from "@/services/productService";
import { OrderService, AnalyticsService } from "@/services/orderService";

export async function GET() {
  return NextResponse.json({
    brand: "GS Collection (Gullu Shani Clothing)",
    protocol: "Model Context Protocol (MCP) Compatible",
    tools: GS_COLLECTION_MCP_TOOLS,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tool, arguments: args, role = "CUSTOMER" } = body;

    const toolDef = GS_COLLECTION_MCP_TOOLS.find((t) => t.name === tool);
    if (!toolDef) {
      return NextResponse.json({ error: `Tool "${tool}" not found` }, { status: 404 });
    }

    // Role security check
    if (toolDef.permission === "ADMIN" && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Admin privileges required for this tool action" },
        { status: 403 }
      );
    }

    // Dispatch to pure Service layer
    let result: any = null;

    if (tool === "search_clothing_catalog") {
      result = await ProductService.searchProducts({
        search: args?.query,
        gender: args?.gender,
        maxPrice: args?.maxPrice,
      });
    } else if (tool === "check_garment_stock") {
      result = await ProductService.checkVariantStock(
        args?.productId,
        args?.sizeName,
        args?.colorName
      );
    } else if (tool === "track_delivery_status") {
      result = await OrderService.trackOrder(args?.orderNumber);
    } else if (tool === "get_admin_sales_metrics") {
      result = await AnalyticsService.getStoreMetrics();
    }

    return NextResponse.json({
      success: true,
      tool,
      output: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal agent execution error" },
      { status: 500 }
    );
  }
}
