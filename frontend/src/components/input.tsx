import { FC, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  rules?: object;
};

export const Input: FC<InputProps> = (props) => {
  const { label, register, error, ...rest } = props;
  return (
    <div>
      <label className="label">
        <span className="text-base label-text text-black">{label}</span>
      </label>
      <input
        {...register}
        {...rest}
        className={`w-full input input-bordered bg-white text-gray-600 ${
          error && "input-error"
        }`}
      />
      {error && <span className="text-error text-sm m-2">{error.message}</span>}
    </div>
  );
};
