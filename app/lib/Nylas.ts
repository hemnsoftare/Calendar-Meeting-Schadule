import Nylas from "nylas";

export const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_SERCET_KEY!,
  apiUri: process.env.NYLAS_API_URL!,
});

export const NylasConfig = {
  clienId: process.env.NYLAS_CLIENT_ID!,
  redirectUrl: process.env.NEXT_PUBLIC_URL + "/api/oauth/exchange",
  apiKey: process.env.NYLAS_API_SERCET_KEY!,
  apiUri: process.env.NYLAS_API_URL!,
};
