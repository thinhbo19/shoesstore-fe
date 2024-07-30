// pages/api/exportSub.js

import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Parser } from "json2csv";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: "us14",
});

export async function GET() {
  try {
    const response = await mailchimp.lists.getListMembersInfo(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
    );

    const fields = [
      "id",
      "email_address",
      "full_name",
      "status",
      "timestamp_signup",
      "ip_signup",
      "member_rating",
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(response.members);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=subscribers.csv",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error exporting subscribers:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to export subscribers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
