"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { INPUT_TYPE, TEXTAREA_ROWS_AMOUNT } from "@/components/input/constants";
import { Input } from "@/components/input/Input";
import { TypeSearchSchema, SearchSchema } from "./service";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

interface FormProps {
  levels: string[];
}

export const Form = ({ levels }: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSearchSchema>({
    resolver: zodResolver(SearchSchema),
    reValidateMode: "onSubmit",
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      description: "",
      gitRepoUrl: "",
      level: levels && levels.length ? levels[0] : "",
    },
  });

  const onSubmit = (data: TypeSearchSchema) => {
    console.log("Form submitted with data:", data);
    alert("Form submitted successfully");
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
      />
      <Input
        label="Email"
        type={INPUT_TYPE.Email}
        control={control}
        placeholder="user@email.com"
        error={errors.email}
        name="email"
      />
      <Dropdown
        label="Skill Level"
        name="level"
        control={control}
        levels={levels}
        error={errors.level}
      />
      <Input
        label="GitHub Repository URL"
        type={INPUT_TYPE.Url}
        control={control}
        placeholder="https://github.com"
        error={errors.gitRepoUrl}
        name="gitRepoUrl"
      />
      <Input
        label="Description"
        control={control}
        placeholder="Write description here..."
        rows={TEXTAREA_ROWS_AMOUNT}
        error={errors.description}
        name="description"
      />
      <Button />
    </form>
  );
};
