// // app/thank-you/page.js
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ThankYouPage() {
//   const [email, setEmail] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     // Retrieve stored data from successful payment
//     const storedEmail = localStorage.getItem("seafreshh_email");
//     const storedOrderId = localStorage.getItem("seafreshh_order_id");
//     const urlStatus = new URLSearchParams(window.location.search).get("status");

//     if (storedEmail) setEmail(storedEmail);
//     if (storedOrderId) setOrderId(storedOrderId);
//     if (urlStatus) setStatus(urlStatus);
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto py-16 px-4">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">
//           Thank You for Your Purchase!
//         </h1>
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//           <p className="text-lg text-gray-800 mb-4">
//             Your SeaFreshh Recipe eBooks are on their way to your inbox!
//           </p>
//           {email && (
//             <p className="text-gray-600">
//               We've sent your eBooks to: <strong>{email}</strong>
//             </p>
//           )}
//           {orderId && (
//             <p className="text-gray-600 mt-2">
//               Order Reference: <strong>{orderId}</strong>
//             </p>
//           )}
//         </div>

//         {status === "verification-error" && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//             <p className="text-yellow-700">
//               We encountered a minor issue during processing, but don't worry!
//               Your recipe books will still be delivered to your email shortly.
//             </p>
//           </div>
//         )}

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold text-blue-800 mb-3">
//             What happens next?
//           </h2>
//           <ul className="text-left space-y-3 text-gray-700">
//             <li className="flex items-start">
//               <span className="mr-2">✅</span>
//               <span>
//                 You'll receive an email with both English and Gujarati recipe
//                 books attached (please check your spam folder if not found)
//               </span>
//             </li>
//             <li className="flex items-start">
//               <span className="mr-2">✅</span>
//               <span>The PDFs will be delivered within 5-10 minutes</span>
//             </li>
//             <li className="flex items-start">
//               <span className="mr-2">✅</span>
//               <span>
//                 You can download and save them to your device for easy access
//               </span>
//             </li>
//           </ul>
//         </div>

//         <div className="space-y-4">
//           <p className="text-gray-600">
//             If you don't receive your eBooks within 30 minutes, please contact
//             us at{" "}
//             <a
//               href="mailto:support@seafreshh.in"
//               className="text-blue-600 font-medium"
//             >
//               support@seafreshh.in
//             </a>
//           </p>

//           <Link
//             href="/"
//             className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//           >
//             Return to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

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
