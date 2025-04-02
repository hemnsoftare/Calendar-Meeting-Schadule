import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hook";
import { nylas, NylasConfig } from "@/app/lib/Nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("you have not code ", {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: NylasConfig.apiKey,
      clientId: NylasConfig.clienId,
      code,
      redirectUri: NylasConfig.redirectUrl,
    });

    const { grantId, email } = response; // in table user create the attr grantId

    await prisma.user.update({
      where: { id: session.user?.id },
      data: {
        grantEmail: email,
        grantId: grantId,
      },
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }
  redirect("/dashboard");
};
