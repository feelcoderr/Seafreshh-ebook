import { google } from "googleapis";

export async function getGoogleDriveAuth() {
  console.log(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY), // Store credentials in environment variable
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
