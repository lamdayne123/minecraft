import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      telco,
      amount,
      serial,
      code,
    } = body;


    if (!telco || !amount || !serial || !code) {
      return NextResponse.json({
        success: false,
        message: "Thiếu dữ liệu thẻ"
      });
    }


    const cookieStore = await cookies();

    const minecraft =
      cookieStore.get("username")?.value ?? "Unknown";


    const partner_id = process.env.CARD2K_PARTNER_ID;
    const partner_key = process.env.CARD2K_PARTNER_KEY;


    if (!partner_id || !partner_key) {
      return NextResponse.json({
        success: false,
        message: "Thiếu Partner ID hoặc Partner Key"
      });
    }


    const request_id = Date.now().toString();


    const sign = crypto
      .createHash("md5")
      .update(
        partner_key + code + serial
      )
      .digest("hex");


    const form = new URLSearchParams();

    form.append("telco", telco);
    form.append("code", code);
    form.append("serial", serial);
    form.append("amount", amount);
    form.append("request_id", request_id);
    form.append("partner_id", partner_id);
    form.append("sign", sign);
    form.append("command", "charging");


    const response = await fetch(
      "https://card2k.net/chargingws/v2",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      }
    );


    const data = await response.json();


    console.log("CARD2K:", data);


    await db.query(
      `
      INSERT INTO payments
      (
        minecraft,
        telco,
        amount,
        serial,
        code,
        status,
        message,
        request_id
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        minecraft,
        telco,
        amount,
        serial.substring(0,4) + "****",
        code.substring(0,4) + "****",
        String(data.status ?? ""),
        data.message ?? "",
        request_id
      ]
    );


    return NextResponse.json(data);


  } catch (error) {

    console.error(
      "CARD ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server"
      },
      {
        status: 500
      }
    );

  }
}
