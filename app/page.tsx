import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("session", session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div>home page</div>
    </main>
  );
}
