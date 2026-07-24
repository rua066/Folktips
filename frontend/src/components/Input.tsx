type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="mb-5">
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition
          ${
            error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-green-700"
          }`}
       />
       {error && (
         <p className="mt-2 text-sm text-red-500">
           {error}
         </p>
        )}
    </div>
  );
}

export default Input;