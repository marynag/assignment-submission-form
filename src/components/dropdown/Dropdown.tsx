import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TypeSearchSchema } from "../form/service";
import { cn } from "../input/utils";

interface DropdownProps {
  label: string;
  name: keyof TypeSearchSchema;
  control: Control<TypeSearchSchema>;
  error?: FieldError;
  levels: string[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  control,
  error,
  levels,
}) => {
  return (
    <div className="mb-5 md:col-span-1 col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={cn(
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5",
              error && "border-2 border-red-500"
            )}
          >
            {levels.length &&
              levels.map((level) => (
                <option key={level} value={level} className="capitalize">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
          </select>
        )}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
