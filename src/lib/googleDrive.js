// lib/googleDrive.js
import { google } from "googleapis";
import crypto from "crypto";

// Optional legacy fix for Vercel
try {
  crypto.createHash("md4");
} catch {
  // Load legacy provider (not always needed but safe)
  process.env.NODE_OPTIONS = "--openssl-legacy-provider";
}

// Use environment variables instead of hardcoding credentials
export async function getGoogleDriveAuth() {
  try {
    // Parse credentials from environment variable
    const credentials = JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    );
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
// Download a file from Google Drive as a Buffer
export async function downloadFileFromDrive(fileId) {
  try {
    if (!fileId) {
      throw new Error("File ID is required");
    }

    const auth = await getGoogleDriveAuth();
    let authClient;
    try {
      authClient = await auth.getClient();
      console.log("Got auth client");
    } catch (err) {
      console.error("Error getting auth client", err);
    }

    const drive = google.drive({ version: "v3", auth: authClient });

    console.log(`Downloading file ${fileId} from Google Drive`);

    let response;
    try {
      response = await drive.files.get(
        {
          fileId,
          alt: "media",
        },
        {
          responseType: "arraybuffer",
          timeout: 10000, // 10 seconds
        }
      );
    } catch (error) {
      console.error("Drive API error:", err);
    }

    if (!response || !response.data) {
      throw new Error(
        `Drive response is empty or undefined for file ${fileId}`
      );
    }

    console.log(
      `Successfully downloaded file ${fileId} (${response.data.length} bytes)`
    );
    return Buffer.from(response.data);
  } catch (error) {
    console.error(
      `Error downloading from Google Drive (file ${fileId}):`,
      error
    );
    throw error;
  }
}
