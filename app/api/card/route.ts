import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {

    const {
      telco,
      amount,
      serial,
      code
    } = await req.json();

    const username =
      (await cookies()).get("username")?.value ??
      "Unknown";

    const partner_id =
      process.env.CARD2K_PARTNER_ID;

    const partner_key =
      process.env.CARD2K_PARTNER_KEY;

    if (!partner_id || !partner_key) {
      return NextResponse.json({
        success: false,
        message: "Thiếu cấu hình Card2K"
      });
    }

    const request_id =
      Date.now().toString();

    const sign = crypto
      .createHash("md5")
      .update(
        partner_key +
        code +
        serial
      )
      .digest("hex");

    const form =
      new URLSearchParams();

    form.append("telco", telco);
    form.append("code", code);
    form.append("serial", serial);
    form.append("amount", amount);
    form.append("request_id", request_id);
    form.append("partner_id", partner_id);
    form.append("sign", sign);
    form.append("command", "charging");

    const response =
      await fetch(
        "https://card2k.net/chargingws/v2",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        }
      );

    const data =
      await response.json();

    await sql`

      INSERT INTO payments (

        minecraft,

        telco,

        amount,

        serial,

        code,

        request_id,

        status,

        message

      )

      VALUES (

        ${username},

        ${telco},

        ${Number(amount)},

        ${serial.slice(0,4) + "****"},

        ${code.slice(0,4) + "****"},

        ${request_id},

        ${Number(data.status)},

        ${data.message}

      )

    `;

    return NextResponse.json(data);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi kết nối server"
      },
      {
        status: 500
      }
    );

  }
}
