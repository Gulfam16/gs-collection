"use client";

import { useState } from "react";
import { MOCK_USERS, MOCK_ORDERS } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import { Search, User, Mail, Phone, Calendar, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Registered Customers</h1>
          <p className="text-xs text-slate-400 mt-1">
            View registered parent and shopper accounts and order histories.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search customers by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/40"
        />
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone / WhatsApp</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
                        {user.fullName[0]}
                      </div>
                      <span className="font-bold text-white">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{user.email}</td>
                  <td className="p-4 text-slate-400">{user.phone || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.role === "ADMIN"
                          ? "bg-purple-950 text-purple-400 border border-purple-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
