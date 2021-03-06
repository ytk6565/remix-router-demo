import { json, redirect } from "@remix-run/cloudflare";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

import db from "~/db";

export const loader: LoaderFunction = async () => {
  const message = await db.get("message:from:about");
  return json({ message: `${message}` });
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const message = body.get("message");

  db.set("message:from:home", `${message}`);

  return redirect("/about");
};

export default function Home() {
  const data = useLoaderData<{ message: string }>();

  return (
    <div>
      <p>Message from About: {data.message}</p>
      <Form method="post">
        <input type="text" name="message" />
        <button type="submit">Send message to About</button>
      </Form>
    </div>
  );
}
