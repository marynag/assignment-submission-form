"use server";
import { API_URL } from "@/components/constants";
import { Form } from "@/components/form/Form";

export default async function Page() {
  const data = await fetch(`${API_URL}/levels`);

  const levels = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col row-start-2 items-center ">
        <Form levels={levels.levels} />
      </main>
    </div>
  );
}
