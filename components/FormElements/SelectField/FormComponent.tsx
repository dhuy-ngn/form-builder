import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CustomInstance, SelectFieldFormElement, SubmitFunction } from ".";

export default function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText, options } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full p-6">
      <Label
        className={cn("flex flex-row gap-0.5",
          error && "text-destructive")}>
        {label}
        {required && (
          <span
            className="text-destructive">
            *
          </span>
        )}
      </Label>
      <Select
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;

          const isValid =
            SelectFieldFormElement.validate(element, value);
          setError(!isValid);

          if (!isValid) return;

          submitValue(element.id, value);
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p className={cn("text-muted-foreground text-[0.75rem]",
          error && "text-destructive")}>
          {helperText}
        </p>
      )}
    </div>
  );
}