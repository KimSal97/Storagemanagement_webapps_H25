route("/api/auth/register", async ({ request }) => {
  const body = await request.json();
  console.log("Request data:", body);

  return Response.json({ message: "Received data!" });
});
