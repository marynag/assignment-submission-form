"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { INPUT_TYPE, TEXTAREA_ROWS_AMOUNT } from "@/components/input/constants";
import { Input } from "@/components/input/Input";
import { SearchSchema, TypeSearchSchema } from "./service";
import { Button } from "../button/Button";

export const Form = () => {
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
      level: "beginner",
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
      <div className="mb-5 md:col-span-1 col-span-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Skill Level
        </label>
        <select
          {...control}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.level && (
          <p className="text-red-500 text-sm">{errors.level.message}</p>
        )}
      </div>
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
