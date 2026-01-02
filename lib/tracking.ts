// Simple event tracking without Google Analytics
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("Event:", eventName, data);
    }
    
    // In production, you can send to your own analytics endpoint
    // For now, we'll just log it
    try {
      // You can extend this to send to your own backend
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventName, data }),
      }).catch(() => {
        // Silently fail if tracking endpoint doesn't exist
      });
    } catch (error) {
      // Silently fail
    }
  }
}

