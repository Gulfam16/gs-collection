import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
} from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-[#0B132A] text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-[#C05646] border border-slate-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Free Nationwide Delivery</h4>
              <p className="text-xs text-slate-400">On all orders above Rs. 3,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-[#C5A059] border border-slate-800 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Easy Exchange</h4>
              <p className="text-xs text-slate-400">Hassle-free size & color swaps</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-emerald-400 border border-slate-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% GOTS Pure Cotton</h4>
              <p className="text-xs text-slate-400">Hypoallergenic & delicate on skin</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-sky-400 border border-slate-800 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Cash on Delivery</h4>
              <p className="text-xs text-slate-400">Pay safely at your doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" isDark={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong>GS Collection (Gullu Shani Clothing)</strong> is dedicated to crafting premium, playful, and durable clothing for children aged 0 to 13. Designed with pure love, organic comfort, and vibrant styles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#C05646] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#C05646] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/shop?gender=BOYS" className="hover:text-white transition-colors">
                  Boys Wear
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=GIRLS" className="hover:text-white transition-colors">
                  Girls Dresses & Frocks
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=BABY" className="hover:text-white transition-colors">
                  Baby Rompers & Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=t-shirts-tops" className="hover:text-white transition-colors">
                  Cotton T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?onSale=true" className="text-[#C05646] font-semibold hover:text-rose-400 transition-colors">
                  Special Sale %
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Help & Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/returns-exchange" className="hover:text-white transition-colors">
                  Returns & Size Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Store Information</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C05646] shrink-0 mt-0.5" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>+92 300 0000000 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@gscollection.pk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} GS Collection (Gullu Shani Clothing). All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-slate-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-400">
            Terms of Service
          </Link>
          <Link
            href="/admin/login"
            className="text-slate-400 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C05646]" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
