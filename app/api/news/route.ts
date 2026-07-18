import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {

  try {

    const news = await sql`

      SELECT
        id,
        title,
        content,
        image,
        author,
        category,
        created_at

      FROM news

      WHERE category IN ('news', 'update')

      ORDER BY created_at DESC

      LIMIT 20

    `;


    return NextResponse.json(news);



  } catch (error:any) {


    console.error(
      "NEWS ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:"Không thể tải tin tức",
        error:error.message
      },
      {
        status:500
      }
    );


  }

}
