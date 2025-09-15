// pages/api/register.js
import { google } from "googleapis";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, mobile, age, source } = req.body;

        // Authenticate with Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Append data into your sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:F", // 6 columns since you're adding date too
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[name, email, mobile, age, source, new Date().toISOString()]],
            },
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Google Sheets error:", error);
        return res.status(500).json({ error: "Failed to save registration" });
    }
}
