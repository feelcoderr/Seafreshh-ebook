// src/app/thank-you/page.js
import { Suspense } from "react";
import ThankYouContent from "./thank-you-content";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
}

// Loading state component to show while the page is loading
function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: "#f7f9fc",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #1976D2",
          borderRadius: "50%",
          marginBottom: "20px",
          // Animation defined in global CSS
        }}
        className="loading-spinner"
      ></div>
      <h2 style={{ color: "#1e293b", fontFamily: "sans-serif" }}>
        Loading your confirmation...
      </h2>
    </div>
  );
}
