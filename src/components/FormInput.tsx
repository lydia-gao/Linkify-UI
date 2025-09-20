"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { cn } from "../lib/utils";

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "password" | "textarea" | "select" | "switch";
  placeholder?: string;
  value?: string | boolean;
  onChange?: (value: string | boolean) => void;
  options?: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  className,
  required = false,
  disabled = false,
}: FormInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(e.target.value);
  };

  const handleSelectChange = (selectedValue: string) => {
    onChange?.(selectedValue);
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange?.(checked);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
        className="text-sm font-medium"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={label.toLowerCase().replace(/\s+/g, "-")}
          placeholder={placeholder}
          value={(value as string) || ""}
          onChange={handleChange}
          disabled={disabled}
          className="min-h-[100px]"
        />
      ) : type === "select" ? (
        <Select
          value={(value as string) || ""}
          onValueChange={handleSelectChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === "switch" ? (
        <div className="flex items-center space-x-2">
          <Switch
            checked={(value as boolean) || false}
            onCheckedChange={handleSwitchChange}
            disabled={disabled}
          />
          <Label className="text-sm text-gray-600">
            {value ? "Active" : "Inactive"}
          </Label>
        </div>
      ) : (
        <Input
          id={label.toLowerCase().replace(/\s+/g, "-")}
          type={type}
          placeholder={placeholder}
          value={(value as string) || ""}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
    </div>
  );
}
