"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import { User, Mail, Phone, Lock, Save } from "lucide-react";

export default function CustomerProfilePage() {
  const { user, updateProfile } = useAuthStore();

  const [fullName, setFullName] = useState(user?.fullName || "Ayesha Malik");
  const [email, setEmail] = useState(user?.email || "ayesha.malik@example.com");
  const [phone, setPhone] = useState(user?.phone || "+92 300 1234567");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, phone });
    showToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-black text-slate-900">Personal Information</h2>
        <p className="text-xs text-slate-500 mt-1">
          Update your contact phone number, name, and account preferences.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5 max-w-lg text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Full Name</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700">Email Address (Read-only)</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              disabled
              value={email}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700">Phone / WhatsApp Number</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
