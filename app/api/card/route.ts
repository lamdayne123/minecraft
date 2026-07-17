import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      telco,
      amount,
      serial,
      code,
    } = body;

    const cookieStore = await cookies();

    const minecraft = cookieStore.get("username")?.value;

    console.log("INPUT CARD:", {
      minecraft,
      telco,
      amount,
    });

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

    console.log("CARD2K RESPONSE:", data);


    return NextResponse.json({
      ...data,
      minecraft,
      request_id
    });


  } catch (error) {

    console.error(
      "CARD2K ERROR:",
      error
    );


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
}      return NextResponse.json({
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


    console.log("CARD2K RESPONSE:", data);



    // Lưu tất cả lịch sử nạp
    const filePath = path.join(
      process.cwd(),
      "data/payments.json"
    );


    // Nếu chưa có file thì tạo mảng rỗng
    let payments = [];

    if (fs.existsSync(filePath)) {
      payments = JSON.parse(
        fs.readFileSync(filePath, "utf8")
      );
    }


    payments.push({

  minecraft,

  telco,

  amount,

  serial: serial.slice(0,4)+"****",

  code: code.slice(0,4)+"****",

  status:data.status,

  message:data.message,

  request_id,

  time:new Date().toISOString()

});



    fs.writeFileSync(
      filePath,
      JSON.stringify(
        payments,
        null,
        2
      )
    );



    return NextResponse.json(data);



  } catch (error) {


    console.error(
      "CARD2K ERROR:",
      error
    );


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
