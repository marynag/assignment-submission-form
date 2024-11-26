import React from "react";
import { cn } from "./utils";
import { INPUT_TYPE } from "./constants";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues> {
  label: string;
  type?: INPUT_TYPE;
  placeholder?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error?: FieldError;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  type = INPUT_TYPE.Text,
  placeholder,
  control,
  error,
  rows,
  disabled = false,
  className = "",
}: InputProps<TFieldValues>) => {
  const commonClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5";
  const errorClasses = error ? "border-2 border-red-500" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const renderInput = (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => {
    const inputProps = {
      ...field,
      disabled,
      className: cn(commonClasses, errorClasses, disabledClasses),
      placeholder,
    };

    if (type === INPUT_TYPE.Text && rows) {
      return <textarea {...inputProps} rows={rows} aria-label={name} />;
    }

    return <input {...inputProps} aria-label={name} />;
  };

  return (
    <div className={`mb-5 ${className}`}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        id={label}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {renderInput(field)}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
