import { nylas, NylasConfig } from "@/app/lib/Nylas";
import { redirect } from "next/navigation";

export const GET = async () => {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: NylasConfig.clienId,
    redirectUri: NylasConfig.redirectUrl,
  });
  return redirect(authUrl);
};
