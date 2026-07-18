import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      secret,
      title,
      content,
      image,
      author,
      category
    } = body;


    if (secret !== process.env.API_SECRET) {

      return NextResponse.json(
        {
          success: false,
          message: "Sai secret"
        },
        {
          status: 401
        }
      );

    }



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
        ${title},
        ${content},
        ${image || ""},
        ${author},
        'event'
      )
    `;



    return NextResponse.json({

      success: true,
      message: "Event added"

    });



  } catch(error) {


    console.error(
      "EVENT UPDATE ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:"Database error"
      },
      {
        status:500
      }
    );


  }

}
