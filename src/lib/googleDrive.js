// lib/googleDrive.js
import { google } from "googleapis";
// Add this at the very top of the file (first import)
import crypto from "crypto";
import { createRequire } from "module";

// Optional legacy fix for Vercel
try {
  crypto.createHash("md4");
} catch {
  // Load legacy provider (not always needed but safe)
  process.env.NODE_OPTIONS = "--openssl-legacy-provider";
}

// Use environment variables instead of hardcoding credentials
export async function getGoogleDriveAuth() {
  // Check if credentials are available in environment variables
  // const credentialsJson = process.env.GOOGLE_DRIVE_CREDENTIALS;

  // if (!credentialsJson) {
  //   throw new Error(
  //     "Google Drive credentials not found in environment variables"
  //   );
  // }

  try {
    // Parse credentials from environment variable
    // const credentials = JSON.parse(credentialsJson);
    /* old google drive cred
      const credentials = {
      type: "service_account",
      project_id: "seafreshh-ebook",
      private_key_id: "43d9c1686ca0136a34ef4c2b1da1b5c45c47be67",
      private_key:
        "-----BEGIN PRIVATE KEY-----\n" +
        "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCww5TcOQjFydl7\n" +
        "CpUmA+d4Axtj6TkNHsbj1SJc5YpMcAumFjGbB/fpb9Ncllg8cggjWBd+RQYHRD1C\n" +
        "JezSUuhjSoDfGHi0F6M8uidDxp4wclIc2RpJUZexBa4l1vL9k5/C1nj9oPhKAyd2\n" +
        "gDCM6UsQUjmoQrtSTpP97hBQmJISWuHqBmY4fQkkLUSs7U8mcsvBl7MWaHZ3bovY\n" +
        "IzbjyjaDbOSdtK4zBEIfqTqYV55uUi4p/ap1M/IKF1yib9b7OhjBZOrbSPXOHJWm\n" +
        "gVXryHv6CxsvDASZb4rNWe9CNJ+/JOuGxiP128sHMxlVW6vhxx1/D/uIBdueb9zc\n" +
        "5xNt0/NzAgMBAAECggEAAlCoHB5EcXq29iKUWNQc7aMfcmE1QGkScnIcf2+jg7lv\n" +
        "8vPqyxIBUDWzufcKHs3g3L2kSSC+9yIQqf4fKj4FvHnW/ZUEzQRbkfRfhpwM/wDF\n" +
        "od/CCrXJMSYBkDikJBK74+xf10qKwJq7+JRYjm/mbhygPrDpDSc++Z4Vk/NQ7nFB\n" +
        "Wyax9iO3tTp/uuvsAxtJmpjhkvDVO44oF5+JVbk5Rjd0wrfUuWltTCdfE03cGVKa\n" +
        "RM3fwPoMaxKWChnD56Q5Wf9S9UtZ0fYbl5CplofRXQSLpnzN2TGrlG80IefA1fwE\n" +
        "EjmVpC/l8QKnIt21FfNPSEjoRETHxh79uf6Hh0VvQQKBgQDjkwESF3JzQX5WCfg0\n" +
        "bqSplWpoDIk2iaHt2S3LOJvPsq/Cz1k9XMYl5c1vEH47pWuRyil98k5B/204jFDY\n" +
        "sH+Xl0VdqV/N9hKRhGdoP/1JVLgg7DBjTwWew/4xJus57EzW6h1ZPLt9emDwAd6F\n" +
        "lNfHOeJl1b91D4qOT5lpMkuTEwKBgQDG19nAC9yZx2GZAxk2cmv+0HgBBpHAdZY9\n" +
        "01Nh8phhnR9DjlrPzr2/5I7HDeIdI1w+gJgPB2FYOEvCprt5jDTKRRAOQNSkOLHE\n" +
        "Z54bpNAZ1yjS+z3BGtZBTjhHxG4Pgg/WTgX8ZoxU1bcs8wBLryQO6PYk54x6LD6H\n" +
        "nzi7F/PKIQKBgEIfWnZJPcXjR7P0HZwOceWcNliZG90uzE/xhG7BufP1NUBjQsij\n" +
        "hidIyBH3NtZZ0BGCLeAcYUSn1LJTgsITNl9zYoI+Tknnr6l8URdnUE7YQM/AEKcq\n" +
        "NLXWuKrLZhlkYUcoqvJcxRVGU5go0uD5SGDonrF8E68NnvKOikKYjIDlAoGAF23T\n" +
        "gGdlZNEzVL4iuGGfC/UwTp6hidXREBPYXVAiWE4VIvahCJ9JiFS75gRiwiAqfErW\n" +
        "n960v5pSgur2aAn3JmYg0C0fYQI1H/k9jfBLfN/3NXTY/+nTmPpIc1xXw4gFqbCj\n" +
        "z+udWVmdLbSsMj6+tusIJa0KxlJ0Q7KlEpZt6UECgYBi+weIaQur1UGAgQ88mQFp\n" +
        "GdD/lBMPjjvYtucekhgCjP1zrfBEEeO/XM8Snt/qEMZP/w9SuWXjujG4ONaqvAPV\n" +
        "9U9Vo68JatP5j/Fbv1ybBgmV/yGDpomO17eRxSMHhWVu5wqGYZ5nddqmv3OhrU2v\n" +
        "oS6rbhR5DJDvSwV7x12JOA==\n" +
        "-----END PRIVATE KEY-----\n",
      client_email: "seafreshh-ebook@seafreshh-ebook.iam.gserviceaccount.com",
      client_id: "114846692535490530822",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/seafreshh-ebook%40seafreshh-ebook.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };*/

    const credentials = {
      type: "service_account",
      project_id: "seafreshh-drive-access",
      private_key_id: "17ae0a6b85df2a3234462c1c2e7ffe62e566f869",
      private_key:
        "-----BEGIN PRIVATE KEY-----\n" +
        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDyQTEaX/cW9xfl\n" +
        "vjTC8/KFgdj9MXL/9K9xtNAt9F8Ojogi/3EyZwucs0BbNqgh5H95wVYy58cnuhEs\n" +
        "C8d1XvhdGAZEh+s6+ilDFItd/5ROffWqvLWvCwB5uKjO4Dy06nERUoQ7F/Ead2oJ\n" +
        "KoS0LfYmuFdIYqtEYrr1pEmNaEG4DWc+QKaxFL4NONuRuCYfhSA7O0Gz6zK3Qx7F\n" +
        "oLsgRS7XE+MxU93rRo9WPn7iyof4C7WyGuIx7+Aw966x1D0/pg28+huFNWnVeiga\n" +
        "GzQBmGuX0+2+f/u5dRmDZ5+HWz9v/hXX78NAgxDONbpNaZufb32saVZtn+z3gy1q\n" +
        "FybG0vGHAgMBAAECggEAH8XcHlTyz+DFkhzRx7X+G3ON1ZtsNVTOw++OlFBmPT8F\n" +
        "bO2q14z7UWiTKsNu5s8Uxw/L8e5DSRsW0HuVA/haQ794ZvmaqQgRbFpf8wqn1Wmg\n" +
        "1G1euOANBmnpPgTcAXB0NuznKeb4eNurnRsl/4m9rJNl4zkJtHTsh3YuLW08nVpn\n" +
        "Wj2k21eEOay0d+2vXg0Q1RKEy0clbAXWXOImNLk9gYTRW0AdluUV0z6evEK5UsN0\n" +
        "KKskx1HyMNVmCUlisw1FFjqn2N0ItbhdLtmqcE5oMAp4LBQe2PddCX/VkGNshqZq\n" +
        "qaaw7LxAUXJq56EAsMHTOg4qywD8gsNtckn6BezNvQKBgQD6ZVL2ELHx+ACMeVh3\n" +
        "NQRGU1STjKhtOJdqkudXff9vNrIN8l2gkwNoXbFvINwOVRJrJRfF8H9isn1SuGWb\n" +
        "ce6+HULOH+ctMPhZS+j91Ts8TvdY5DRLGuWocXudVZb966rWQE3zIGkmJOjZlw1V\n" +
        "LNtwETt5FPdldXmjrj1PAI1z1QKBgQD3rTjUYabZcySO/Z/ArLDOKtAnRaf7rhPb\n" +
        "ycDoIKDoVQlOgWiceLDZ+NIZZVorBlJcExJJUYP7nelKP3giHFga/0/z9OxDcMHB\n" +
        "P2+KiNhLA6BWxMD6SPzGatfMhM1T0P0IOUEH4aQX6SXpPml9RTfj2przEWTkQn87\n" +
        "+o+38Hqp6wKBgQDQm+nqJy6ZMM0EO3SAnCLblEE6TE1l8Wf02j7ynX5Z4W+mPu3S\n" +
        "AaktIiHZO78aEbYundCYkC0QxTOz3vyH7PvCWA54PAwVkl7VxnBuSV/4drGL1VPb\n" +
        "3qTHGQSrp8sL8XN63EgU7kOsC8QSw83P0HdhfnnV/qm+VYjp3Rgm4Yb3oQKBgCJY\n" +
        "YwkQgZKl5OvvP7f4OoxcY4EOp7y+5wITeCy4WZfeMuwwBdGs6tlPJ9NduqM8vS8H\n" +
        "dgG0zBiYTUF+i6ovRAh6Xxv1Ws3/VN73bQBI+bVtS068+gW7GVJqfoJd6Bs3X99E\n" +
        "EUCGibrHGfq+LOKyNo3iQppyTwtYLUyj8koPjvMBAoGAGgzUAEGxVKiMIF3FVY+S\n" +
        "93x+DJe/+1AslgJd+hFubmdIyD+PoKZeM8BVpcZqwzYzAYnnUm5scoS9EhurbEt4\n" +
        "rFRWnoq8GjpwxAgrWb7oaiMpnvnAX9a5C+CqikdkX2UhRfJMb8Aii8KUj0Xn8iXB\n" +
        "UHu5n981LDzsH48kns/sMeg=\n" +
        "-----END PRIVATE KEY-----\n" +
        "",
      client_email:
        "drive-access@seafreshh-drive-access.iam.gserviceaccount.com",
      client_id: "111468440486514750264",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/drive-access%40seafreshh-drive-access.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    return auth;
  } catch (error) {
    console.error("Error initializing Google Drive auth:", error);
    throw new Error("Failed to initialize Google Drive authentication");
  }
}

export async function downloadFileFromDrive(fileId) {
  try {
    if (!fileId) {
      throw new Error("File ID is required");
    }

    const auth = await getGoogleDriveAuth();
    const drive = google.drive({ version: "v3", auth });

    // Add more detailed logging
    console.log(`Downloading file ${fileId} from Google Drive`);

    // Get the file with error handling
    try {
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        { responseType: "arraybuffer" }
      );

      console.log(
        `Successfully downloaded file ${fileId} (${response.data.length} bytes)`
      );
      return Buffer.from(response.data);
    } catch (driveError) {
      // Add specific error handling for common Drive API errors
      if (driveError.code === 404) {
        throw new Error(`File not found: ${fileId}`);
      } else if (driveError.code === 403) {
        throw new Error(`Permission denied for file: ${fileId}`);
      } else {
        throw new Error(`Drive API error: ${driveError.message}`);
      }
    }
  } catch (error) {
    console.error(
      `Error downloading from Google Drive (file ${fileId}):`,
      error
    );
    throw error;
  }
}

// import { google } from "googleapis";
// import credentialsFile from "./credentials.json";

// export async function getGoogleDriveAuth() {
//   const credentials = {
//     type: "service_account",
//     project_id: "seafreshh-ebook",
//     private_key_id: "43d9c1686ca0136a34ef4c2b1da1b5c45c47be67",
//     private_key:
//       "-----BEGIN PRIVATE KEY-----\n" +
//       "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCww5TcOQjFydl7\n" +
//       "CpUmA+d4Axtj6TkNHsbj1SJc5YpMcAumFjGbB/fpb9Ncllg8cggjWBd+RQYHRD1C\n" +
//       "JezSUuhjSoDfGHi0F6M8uidDxp4wclIc2RpJUZexBa4l1vL9k5/C1nj9oPhKAyd2\n" +
//       "gDCM6UsQUjmoQrtSTpP97hBQmJISWuHqBmY4fQkkLUSs7U8mcsvBl7MWaHZ3bovY\n" +
//       "IzbjyjaDbOSdtK4zBEIfqTqYV55uUi4p/ap1M/IKF1yib9b7OhjBZOrbSPXOHJWm\n" +
//       "gVXryHv6CxsvDASZb4rNWe9CNJ+/JOuGxiP128sHMxlVW6vhxx1/D/uIBdueb9zc\n" +
//       "5xNt0/NzAgMBAAECggEAAlCoHB5EcXq29iKUWNQc7aMfcmE1QGkScnIcf2+jg7lv\n" +
//       "8vPqyxIBUDWzufcKHs3g3L2kSSC+9yIQqf4fKj4FvHnW/ZUEzQRbkfRfhpwM/wDF\n" +
//       "od/CCrXJMSYBkDikJBK74+xf10qKwJq7+JRYjm/mbhygPrDpDSc++Z4Vk/NQ7nFB\n" +
//       "Wyax9iO3tTp/uuvsAxtJmpjhkvDVO44oF5+JVbk5Rjd0wrfUuWltTCdfE03cGVKa\n" +
//       "RM3fwPoMaxKWChnD56Q5Wf9S9UtZ0fYbl5CplofRXQSLpnzN2TGrlG80IefA1fwE\n" +
//       "EjmVpC/l8QKnIt21FfNPSEjoRETHxh79uf6Hh0VvQQKBgQDjkwESF3JzQX5WCfg0\n" +
//       "bqSplWpoDIk2iaHt2S3LOJvPsq/Cz1k9XMYl5c1vEH47pWuRyil98k5B/204jFDY\n" +
//       "sH+Xl0VdqV/N9hKRhGdoP/1JVLgg7DBjTwWew/4xJus57EzW6h1ZPLt9emDwAd6F\n" +
//       "lNfHOeJl1b91D4qOT5lpMkuTEwKBgQDG19nAC9yZx2GZAxk2cmv+0HgBBpHAdZY9\n" +
//       "01Nh8phhnR9DjlrPzr2/5I7HDeIdI1w+gJgPB2FYOEvCprt5jDTKRRAOQNSkOLHE\n" +
//       "Z54bpNAZ1yjS+z3BGtZBTjhHxG4Pgg/WTgX8ZoxU1bcs8wBLryQO6PYk54x6LD6H\n" +
//       "nzi7F/PKIQKBgEIfWnZJPcXjR7P0HZwOceWcNliZG90uzE/xhG7BufP1NUBjQsij\n" +
//       "hidIyBH3NtZZ0BGCLeAcYUSn1LJTgsITNl9zYoI+Tknnr6l8URdnUE7YQM/AEKcq\n" +
//       "NLXWuKrLZhlkYUcoqvJcxRVGU5go0uD5SGDonrF8E68NnvKOikKYjIDlAoGAF23T\n" +
//       "gGdlZNEzVL4iuGGfC/UwTp6hidXREBPYXVAiWE4VIvahCJ9JiFS75gRiwiAqfErW\n" +
//       "n960v5pSgur2aAn3JmYg0C0fYQI1H/k9jfBLfN/3NXTY/+nTmPpIc1xXw4gFqbCj\n" +
//       "z+udWVmdLbSsMj6+tusIJa0KxlJ0Q7KlEpZt6UECgYBi+weIaQur1UGAgQ88mQFp\n" +
//       "GdD/lBMPjjvYtucekhgCjP1zrfBEEeO/XM8Snt/qEMZP/w9SuWXjujG4ONaqvAPV\n" +
//       "9U9Vo68JatP5j/Fbv1ybBgmV/yGDpomO17eRxSMHhWVu5wqGYZ5nddqmv3OhrU2v\n" +
//       "oS6rbhR5DJDvSwV7x12JOA==\n" +
//       "-----END PRIVATE KEY-----\n",
//     client_email: "seafreshh-ebook@seafreshh-ebook.iam.gserviceaccount.com",
//     client_id: "114846692535490530822",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url:
//       "https://www.googleapis.com/robot/v1/metadata/x509/seafreshh-ebook%40seafreshh-ebook.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com",
//   };
//   const auth = new google.auth.GoogleAuth({
//     credentials: credentials,
//     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//   });

//   return auth;
// }

// export async function downloadFileFromDrive(fileId) {
//   try {
//     const auth = await getGoogleDriveAuth();
//     const drive = google.drive({ version: "v3", auth });

//     // Get the file
//     const response = await drive.files.get(
//       {
//         fileId: fileId,
//         alt: "media",
//       },
//       { responseType: "arraybuffer" }
//     );

//     return Buffer.from(response.data);
//   } catch (error) {
//     console.error("Error downloading from Google Drive:", error);
//     throw error;
//   }
// }
