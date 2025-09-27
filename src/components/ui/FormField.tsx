import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormFieldProps } from "@/types";

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="block font-bold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
