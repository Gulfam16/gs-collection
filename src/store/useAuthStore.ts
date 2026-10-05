"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, Address } from "@/types";
import { MOCK_USERS } from "@/lib/mockData";

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: "CUSTOMER" | "ADMIN") => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email: string, role = "CUSTOMER") => {
        // Find existing mock user or initialize session
        const existing = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        const user: UserProfile = existing || {
          id: `usr-${Date.now()}`,
          email,
          fullName: email.split("@")[0].replace(".", " "),
          phone: "+92 300 0000000",
          role,
          addresses: [],
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === "ADMIN",
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAdmin: false });
      },

      updateProfile: (data) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...data } });
      },

      addAddress: (address) => {
        const current = get().user;
        if (!current) return;
        const currentAddresses = current.addresses || [];
        set({
          user: {
            ...current,
            addresses: [...currentAddresses, { ...address, id: `addr-${Date.now()}` }],
          },
        });
      },
    }),
    {
      name: "gs-collection-auth-storage",
    }
  )
);
