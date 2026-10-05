import Link from "next/link";
import Image from "next/image";
import { formatPrice, formatDate } from "@/lib/utils";
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_USERS } from "@/lib/mockData";
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Package,
} from "lucide-react";

export default function AdminDashboardPage() {
  const totalSales = MOCK_ORDERS.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = MOCK_ORDERS.length;
  const totalProducts = MOCK_PRODUCTS.length;
  const totalCustomers = MOCK_USERS.length;

  // Find low stock variants (stock < 5)
  const lowStockVariants = MOCK_PRODUCTS.flatMap((p) =>
    p.variants
      .filter((v) => v.stockQuantity < 5)
      .map((v) => ({
        productName: p.name,
        size: v.size.name,
        color: v.color.name,
        stock: v.stockQuantity,
        sku: v.sku,
      }))
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Store Analytics Overview</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Welcome to GS Collection administration. Monitor live orders, stock levels, and store performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Total Net Sales</span>
            <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{formatPrice(totalSales)}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +18.4% from last week
          </div>
        </div>

        {/* Orders */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Total Orders</span>
            <div className="p-2 rounded-xl bg-sky-950/80 text-sky-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalOrders}</div>
          <div className="text-[11px] text-slate-400">All Cash on Delivery orders</div>
        </div>

        {/* Products */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Active Products</span>
            <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalProducts}</div>
          <div className="text-[11px] text-slate-400">Across 6 kids departments</div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Low Stock SKUs</span>
            <div className="p-2 rounded-xl bg-amber-950/80 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400">{lowStockVariants.length}</div>
          <div className="text-[11px] text-amber-300 font-semibold">Requires restocking</div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Low Stock Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-base text-white">Recent Customer Orders</h3>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#E05A47] hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 font-bold text-white">{order.orderNumber}</td>
                    <td className="py-3.5 text-slate-200">
                      {order.shippingAddress.recipientName}
                    </td>
                    <td className="py-3.5 text-slate-400">
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} pcs
                    </td>
                    <td className="py-3.5 font-bold text-emerald-400">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Low-Stock Alerts</span>
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Update Stock
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockVariants.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1"
              >
                <div className="flex justify-between items-start">
                  <h5 className="font-bold text-xs text-white truncate max-w-44">
                    {item.productName}
                  </h5>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.stock === 0
                        ? "bg-rose-950 text-rose-400 border border-rose-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {item.stock === 0 ? "Out of Stock" : `${item.stock} left`}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex gap-2">
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span>Color: {item.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
