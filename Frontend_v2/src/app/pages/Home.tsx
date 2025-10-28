'use client';
import SeedResult from "@/components/SeedResult";
import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  return (
    <>
    <div>
      <p>
        {ctx.user?.name
          ? `You are logged in as user ${ctx.user.name}`
          : "You are not logged in"}
      </p>
    </div>
    <SeedResult />
    </>
  );
}
