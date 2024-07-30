import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: "us14",
});

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse(JSON.stringify({ message: "Email is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return new NextResponse(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
    );

    return new NextResponse(JSON.stringify(response.members), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse(JSON.stringify({ message: "Email is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    const response = await mailchimp.lists.deleteListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      email
    );

    return new NextResponse(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete subscriber" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
