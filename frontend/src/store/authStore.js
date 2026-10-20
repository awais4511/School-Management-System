import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { loginAPI, signupAPI, logoutAPI } from "../api/authService.js";

const ROLE_ROUTES = {
  Administrator: "/dashboard/admin",
  Teacher: "/dashboard/teacher",
  Student: "/dashboard/student",
  "Parent / Guardian": "/dashboard/parent",
};

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,    
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        successMessage: null,

        login: async ({ email, password, role }) => {
          set({ isLoading: true, error: null, successMessage: null });
          try {
            const response = await loginAPI(email, password);

            if (!response.success) {
              set({ isLoading: false, error: response.error });
              return { ok: false };
            }

            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              successMessage: response.message || `Welcome back! Signing in as ${role}…`,
              error: null,
            });
            return { ok: true, redirect: ROLE_ROUTES[response.user.role] || "/" };
          } catch (err) {
            const errorMsg = err.message || "Login failed.";
            set({ isLoading: false, error: errorMsg });
            return { ok: false };
          }
        },

        signup: async ({ firstName, lastName, email, password, confirmPassword, role, idNumber }) => {
          set({ isLoading: true, error: null, successMessage: null });
          try {
            const response = await signupAPI({
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              role,
            });

            if (!response.success) {
              set({ isLoading: false, error: response.error });
              return { ok: false };
            }

            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              successMessage: response.message || `Account created for ${firstName} ${lastName} (${role})!`,
              error: null,
            });
            return { ok: true, redirect: ROLE_ROUTES[response.user.role] || "/" };
          } catch (err) {
            const errorMsg = err.message || "Signup failed.";
            set({ isLoading: false, error: errorMsg });
            return { ok: false };
          }
        },

        logout: async () => {
          try {
            const state = useAuthStore.getState();
            if (state.token) {
              await logoutAPI(state.token);
            }
          } catch (err) {
            console.error("Logout error:", err);
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
            successMessage: null,
          });
        },

        clearMessages: () => set({ error: null, successMessage: null }),
      }),
      {
        name: "auth-storage",          
        partialize: (state) => ({   
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);
