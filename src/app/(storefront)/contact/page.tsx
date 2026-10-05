"use client";

import { useState } from "react";
import { showToast } from "@/store/useToastStore";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please fill in your name, email, and message", "error");
      return;
    }

    setIsSent(true);
    showToast("Message sent successfully! Our team will contact you shortly.", "success");
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Contact GS Collection Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Questions about sizing, custom orders, or delivery status? Reach out to our friendly support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">WhatsApp Fast Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Instant size advice & order inquiries</p>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 font-bold text-xs text-emerald-700 hover:underline"
              >
                +92 300 0000000
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Customer Email</h4>
              <p className="text-xs text-slate-500 mt-0.5">Send us your feedback and questions</p>
              <a
                href="mailto:support@gscollection.pk"
                className="inline-block mt-2 font-bold text-xs text-sky-700 hover:underline"
              >
                support@gscollection.pk
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E05A47] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Studio Location</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Lahore, Punjab, Pakistan
              </p>
              <span className="inline-block mt-2 font-medium text-xs text-slate-400">
                Mon - Sat: 10:00 AM - 7:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Sizing query / Order delivery"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Your Message *</label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist you with children's clothing today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
