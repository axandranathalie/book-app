// composables/useApi.ts
/**
 * useApi - Returns the base API URL from environment variables.
 * Centralized way to access API base path.
 */
export const useApi = () => {
  const API_URL = import.meta.env.VITE_API_URL
  return { API_URL }
}
