import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const { fullname, attendance, guests } = await request.json();

    // 1. Cấu hình xác thực Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 2. Định nghĩa dòng dữ liệu sẽ chèn vào
    const values = [
      [
        fullname,
        attendance === "yes" ? "Tham dự" : "Không tham dự",
        guests,
        new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      ],
    ];

    // 3. Thực hiện chèn dữ liệu vào sheet (Sheet1 là tên mặc định của tab)
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json(
      { message: "Gửi dữ liệu thành công!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Google Sheets Error:", error);
    return NextResponse.json(
      { message: "Lỗi kết nối Google Sheets", error: error.message },
      { status: 500 },
    );
  }
}
