import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { telco, amount, serial, code } = await req.json();

    const partner_id = process.env.CARD2K_PARTNER_ID!;
    const partner_key = process.env.CARD2K_PARTNER_KEY!;

    const request_id = Date.now().toString();

    const sign = crypto
      .createHash("md5")
      .update(partner_key + code + serial)
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

    const response = await fetch("https://card2k.net/chargingws/v2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi kết nối server",
      },
      { status: 500 }
    );
  }
}
