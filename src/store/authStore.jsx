import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signupWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data, loading: false });
      localStorage.setItem("document_owner", JSON.stringify(data));
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  signupWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      localStorage.setItem("document_owner", JSON.stringify(data));
      set({ loading: false });
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data, loading: false });
      localStorage.setItem("document_owner", JSON.stringify(data));
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      set({ loading: false });
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },
}));
