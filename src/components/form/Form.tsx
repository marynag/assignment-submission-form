"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { INPUT_TYPE, TEXTAREA_ROWS_AMOUNT } from "@/components/input/constants";
import { Input } from "@/components/input/Input";
import { TypeSearchSchema, SearchSchema } from "./service";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";
import { sendForm } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FormProps {
  levels: string[] | undefined;
  isLevelsLoaded?: boolean;
}

export const Form = ({ levels, isLevelsLoaded = false }: FormProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeSearchSchema>({
    resolver: zodResolver(SearchSchema),
    reValidateMode: "onChange",
    // mode: "onSubmit",
    defaultValues: {
      level: levels && levels.length ? levels[0] : undefined,
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        setError(undefined);
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  const onSubmit = async (data: TypeSearchSchema) => {
    const { success, error } = await sendForm(
      data.name,
      data.email,
      data.description,
      data.gitRepoUrl,
      data.level
    );

    if (success) {
      router.push("/thank-you");
    } else if (error) {
      setError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 grid-cols-1 gap-2 border py-6 md:px-16 px-3 rounded-2xl md:w-2/3 w-full shadow-2xl"
    >
      <Input
        label="Name"
        control={control}
        placeholder="Emmy Porter"
        error={errors.name}
        name="name"
        className="md:col-span-1 col-span-2"
      />
      <Input
        label="Email"
        type={INPUT_TYPE.Email}
        control={control}
        placeholder="user@email.com"
        error={errors.email}
        name="email"
        className="md:col-span-1 col-span-2"
      />
      <Dropdown
        label="Skill Level"
        name="level"
        control={control}
        levels={levels ?? []}
        error={errors.level}
        isLoaded={isLevelsLoaded}
      />
      <Input
        label="GitHub Repository URL"
        type={INPUT_TYPE.Url}
        control={control}
        placeholder="https://github.com"
        error={errors.gitRepoUrl}
        name="gitRepoUrl"
        className="md:col-span-1 col-span-2"
      />
      <Input
        label="Description"
        control={control}
        placeholder="Write description here..."
        rows={TEXTAREA_ROWS_AMOUNT}
        error={errors.description}
        name="description"
        className="col-span-2"
      />

      <Button disabled={!isValid} />
      {error && (
        <p className="text-red-500 text-sm col-span-2 text-center">{error}</p>
      )}
    </form>
  );
};
