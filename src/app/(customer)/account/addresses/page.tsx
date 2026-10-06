"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import { MapPin, Plus, CheckCircle, Trash2 } from "lucide-react";
import { Address } from "@/types";

export default function CustomerAddressesPage() {
  const { user, addAddress } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // New address state
  const [recipientName, setRecipientName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [province, setProvince] = useState("Punjab");
  const [postalCode, setPostalCode] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !phone.trim() || !streetAddress.trim()) {
      showToast("Please fill all required address fields", "error");
      return;
    }

    addAddress({
      recipientName,
      phone,
      streetAddress,
      city,
      province,
      postalCode,
      country: "Pakistan",
      isDefault: true,
    });

    showToast("New delivery address saved!", "success");
    setShowAddModal(false);
  };

  const addresses = user?.addresses || [
    {
      id: "addr-default",
      recipientName: "Ayesha Malik",
      phone: "+92 300 1234567",
      streetAddress: "House 42-B, Street 14, Phase 5, DHA",
      city: "Lahore",
      province: "Punjab",
      postalCode: "54792",
      country: "Pakistan",
      isDefault: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Delivery Addresses</h2>
          <p className="text-xs text-slate-500 mt-1">
            Save multiple home and gift shipping addresses for faster checkout.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C05646] hover:bg-[#A84638] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr, idx) => (
          <div
            key={addr.id || `addr-${idx}-${addr.streetAddress || addr.phone || idx}`}
            className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3 relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-extrabold text-sm text-slate-900 block">
                  {addr.recipientName}
                </span>
                <span className="text-xs text-slate-500 font-medium">{addr.phone}</span>
              </div>
              {addr.isDefault && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Default
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {addr.streetAddress}, {addr.city}, {addr.province} {addr.postalCode && `(${addr.postalCode})`}
            </p>
            <p className="text-[11px] text-slate-400 font-semibold">{addr.country}</p>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-4">
            <h3 className="font-black text-lg text-slate-900 border-b pb-3">Add Shipping Address</h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Province *</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C05646] text-white font-bold rounded-xl hover:bg-[#A84638]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
