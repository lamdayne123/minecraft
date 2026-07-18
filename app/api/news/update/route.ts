import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {

  try {

    const body = await req.json();


    if (body.secret !== process.env.API_SECRET) {

      return NextResponse.json(
        {
          success: false,
          message: "Wrong secret"
        },
        {
          status: 401
        }
      );

    }


    if (!body.title || !body.content) {

      return NextResponse.json(
        {
          success: false,
          message: "Missing title or content"
        },
        {
          status:400
        }
      );

    }



    const category =
      ["news", "update", "event"].includes(body.category)
      ? body.category
      : "news";



    await sql`

      INSERT INTO news
      (
        title,
        content,
        image,
        author,
        category
      )

      VALUES
      (
        ${body.title},
        ${body.content},
        ${body.image || ""},
        ${body.author || "Craftopia"},
        ${category}
      )

    `;



    return NextResponse.json({

      success:true,
      message:"News saved"

    });



  } catch(error:any) {


    console.error(
      "NEWS UPDATE ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:"Database error",
        error:error.message
      },
      {
        status:500
      }
    );


  }

}
