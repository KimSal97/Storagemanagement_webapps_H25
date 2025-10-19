import { drizzle } from "drizzle-orm/d1";
import { users } from "./schema";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const db = drizzle(env.DB);
    const url = new URL(request.url);

    // GET /users
    if (url.pathname === "/users" && request.method === "GET") {
      const allUsers = await db.select().from(users).all();
      return Response.json(allUsers);
    }

    // POST /add-user
    if (url.pathname === "/add-user" && request.method === "POST") {
      try {
        const body = await request.json() as {
          email: string;
          username: string;
          password: string;
        };

        if (!body.email || !body.username || !body.password) {
          return new Response("Missing fields", { status: 400 });
        }

        await db.insert(users).values({
          email: body.email,
          username: body.username,
          password: body.password,
        }).run();

        return new Response("User added successfully!", { status: 201 });
      } catch (err) {
        console.error(err);
        return new Response("Error adding user", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
