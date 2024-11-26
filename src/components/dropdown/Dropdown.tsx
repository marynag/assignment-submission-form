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
  isLoaded: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  control,
  error,
  levels,
  isLoaded,
}) => {
  const renderErrorMessage = () => {
    if (!isLoaded) {
      return (
        <p className="text-red-500 text-sm">
          Error occurred while loading skills rating
        </p>
      );
    }

    if (!levels.length) {
      return (
        <p className="text-red-500 text-sm">
          No levels available for selection
        </p>
      );
    }

    return null;
  };

  const selectClassName = cn(
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
    "focus:border-blue-500 block w-full p-2.5",
    error && "border-2 border-red-500"
  );
  const renderSelect = () => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={selectClassName}
            data-testid={"level"}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {levels.map((level) => (
              <option key={level} value={level} className="capitalize">
                {level}
              </option>
            ))}
          </select>
        )}
      />
    );
  };
  return (
    <div className="mb-5 md:col-span-1 col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      {renderErrorMessage() || renderSelect()}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
