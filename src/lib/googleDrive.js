// lib/googleDrive.js
import { google } from "googleapis";

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
    };

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
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
