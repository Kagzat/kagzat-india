import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // ---------------- SIGNUP WITH EMAIL ----------------
  signupWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // 1. Sign up user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      const user = data.user;
      if (!user) throw new Error("No user returned after signup");

      // 2. Insert into your "accounts" table
      const { error: dbError } = await supabase.from("accounts").insert([
        {
          id: user.id, // UUID from Supabase Auth
          email: user.email,
        },
      ]);
      if (dbError) throw dbError;

      // 3. Update state + localStorage
      set({ user, loading: false });
      localStorage.setItem("document_owner", JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  // ---------------- SIGNUP WITH GOOGLE ----------------
  signupWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;

      const user = data.user;
      if (user) {
        // Insert into "accounts" table (upsert to avoid duplicates)
        await supabase.from("accounts").upsert({
          id: user.id,
          email: user.email,
        });
      }

      localStorage.setItem("document_owner", JSON.stringify(user));
      set({ user, loading: false });

      return { success: true, user };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  // ---------------- LOGIN WITH EMAIL ----------------
  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const user = data.user;
      set({ user, loading: false });
      localStorage.setItem("document_owner", JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  // ---------------- LOGIN WITH GOOGLE ----------------
  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;

      const user = data.user;
      set({ user, loading: false });
      localStorage.setItem("document_owner", JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },
}));
