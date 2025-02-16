import { useFormContext } from "react-hook-form";

type TInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  rows?: number; // Optional rows for textarea
};

const Input = ({
  label,
  name,
  placeholder,
  type,
  required,
  rows = 3,
}: TInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validationRules = required ? { required: `${label} is required` } : {};

  return (
    <div className="py-1">
      <label htmlFor={name} className="mb-2 font-serif">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          rows={rows}
          {...register(name, validationRules)}
          className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, validationRules)}
          className="input input-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-sm font-serif pt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
