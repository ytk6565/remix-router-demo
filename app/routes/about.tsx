import { json, redirect } from "@remix-run/cloudflare";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

import db from "~/db";

export const loader: LoaderFunction = async () => {
  const message = await db.get("message:from:home");
  return json({ message: `${message}` });
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const message = body.get("message");

  db.set("message:from:about", `${message}`);

  return redirect("/");
};

export default function Home() {
  const data = useLoaderData<{ message: string }>();

  return (
    <div>
      <p>Message from Home: {data.message}</p>
      <Form method="post">
        <input type="text" name="message" />
        <button type="submit">Send message to Home</button>
      </Form>
    </div>
  );
}
