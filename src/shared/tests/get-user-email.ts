export async function getUserEmail(email: string) {
  const mailCatcherResponse = await fetch(
    "http://localhost:8025/api/v2/messages",
  );
  const mailCatcherBody = await mailCatcherResponse.json();
  const mailBox = mailCatcherBody.items;

  const message = mailBox.find((message) =>
    message.Content.Headers.To[0]?.includes(email.toLowerCase()),
  );

  return message;
}