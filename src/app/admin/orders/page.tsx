"use client";

import { useState } from "react";
import Image from "next/image";
import { MOCK_ORDERS } from "@/lib/mockData";
import { formatPrice, formatDate } from "@/lib/utils";
import { showToast } from "@/store/useToastStore";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  AlertCircle,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress.city.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress.phone.includes(search);

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order status updated to ${newStatus}`, "success");
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handlePaymentStatusChange = (orderId: string, newPaymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
    );
    showToast(`Payment status updated to ${newPaymentStatus}`, "success");
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, paymentStatus: newPaymentStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Order Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer deliveries, update fulfillment stages, and verify Cash on Delivery receipts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Order #, Customer Name, Phone, or City..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/40"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 focus:ring-2 focus:ring-[#E05A47]/40"
        >
          <option value="all">All Order Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer & City</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <span className="font-extrabold text-white block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-white block">
                      {order.shippingAddress.recipientName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {order.shippingAddress.city}, {order.shippingAddress.phone}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-300">
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} garments
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-emerald-400">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(order.id, e.target.value as PaymentStatus)
                      }
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border bg-slate-950 ${
                        order.paymentStatus === "PAID"
                          ? "text-emerald-400 border-emerald-800"
                          : "text-amber-400 border-amber-800"
                      }`}
                    >
                      <option value="PENDING">COD (Pending)</option>
                      <option value="PAID">COD (Paid)</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-slate-950 text-white border-slate-700"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-xl p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-black text-lg text-white">
                  Order {selectedOrder.orderNumber}
                </h3>
                <span className="text-xs text-slate-400">
                  Placed on {formatDate(selectedOrder.createdAt)}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Shipping Destination
              </span>
              <p className="font-extrabold text-white text-sm">
                {selectedOrder.shippingAddress.recipientName} ({selectedOrder.shippingAddress.phone})
              </p>
              <p className="text-slate-300">
                {selectedOrder.shippingAddress.streetAddress}, {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.province}
              </p>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Garments Purchased
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{item.productName}</span>
                      <span className="text-[11px] text-slate-400">
                        Size: {item.sizeName} • Color: {item.colorName} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-white">{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-white">{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="font-bold text-emerald-400">
                  -{formatPrice(selectedOrder.discountAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="font-bold text-white">
                  {selectedOrder.shippingFee === 0 ? "FREE" : formatPrice(selectedOrder.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Payable Amount:</span>
                <span className="text-[#E05A47] text-base">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
