// This file is kept for potential future use
// Currently not using Firebase authentication, but keeping structure for future extensions

const mockConfig = {
  appName: "NexusBlog",
  version: "1.0.0"
};

console.log("Firebase authentication removed. Using simple authentication for admin controls.");

export const isAdmin = (password: string) => {
  // Simple password check for admin access
  return password === import.meta.env.VITE_ADMIN_PASSWORD || password === "admin123"; // Default fallback
};

export default mockConfig;
