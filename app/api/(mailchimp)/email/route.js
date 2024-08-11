import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const LIST_ID = "bbc6f6ebd2";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: "us14",
});

const hashMD5 = (str) => {
  const hashStr = CryptoJS.MD5(str).toString();
  return hashStr;
};

export async function POST(req) {
  const { email, full_name } = await req.json();
  const emailMd5 = hashMD5(email);

  if (!email) {
    return new NextResponse(JSON.stringify({ message: "Email is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
  try {
    const response = await mailchimp.lists.setListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      emailMd5,
      {
        email_address: email,
        full_name: full_name,
        status: "subscribed",
        status_if_new: "subscribed",
      }
    );

    return new NextResponse(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
      { status: "subscribed" }
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

export async function PUT(req) {
  try {
    const { email } = await req.json();
    console.log(email);
    let response;
    if (typeof email === "object") {
      response = await mailchimp.lists.setListMember(email.list_id, email.id, {
        status: "unsubscribed",
      });
    } else {
      const id = hashMD5(email);
      response = await mailchimp.lists.setListMember(LIST_ID, id, {
        status: "unsubscribed",
      });
    }

    return new NextResponse(JSON.stringify(response), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      headers: {
        "Content-type": "application/json",
      },
      status: 400,
    });
  }
}
