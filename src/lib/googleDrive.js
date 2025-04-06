import { google } from "googleapis";
import credentialsFile from "./credentials.json";

export async function getGoogleDriveAuth() {
  console.log("credentials : ", credentialsFile);
  const auth = new google.auth.GoogleAuth({
    credentials: credentialsFile,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return auth;
}

export async function downloadFileFromDrive(fileId) {
  try {
    const auth = await getGoogleDriveAuth();
    const drive = google.drive({ version: "v3", auth });

    // Get the file
    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      { responseType: "arraybuffer" }
    );

    return Buffer.from(response.data);
  } catch (error) {
    console.error("Error downloading from Google Drive:", error);
    throw error;
  }
}
