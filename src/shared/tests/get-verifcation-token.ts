import { getUserEmail } from "./get-user-email";

export async function getVerificationToken(email: string) {
  const message = await getUserEmail(email);

  const body = message.Content.Body
    .replace(/=\r?\n/g, "")
    .replace(/=20/g, " ");

  const active_link = body.match(/http?:\/\/\S+/)[0];

  return active_link.split("/")[5];
}