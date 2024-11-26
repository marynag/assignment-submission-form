import { IconButton } from "@/components/iconButton/IconButton";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <IconButton className={"md:h-10 md:w-10 h-6 w-6"} />
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl px-10 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500">
          Thank you for submitting your assignment!
        </span>
      </h1>
    </div>
  );
}
