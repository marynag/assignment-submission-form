"use server";
import { Form } from "@/components/form/Form";
import { getLevels } from "./actions";

export default async function Page() {
  const { data, success } = await getLevels();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col row-start-2 items-center ">
        <Form levels={data} isLevelsLoaded={success} />
      </main>
    </div>
  );
}
