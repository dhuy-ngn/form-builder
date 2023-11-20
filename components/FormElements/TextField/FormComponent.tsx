import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CustomInstance, SubmitFunction, TextFieldFormElement } from ".";

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
  const { label, required, placeholder, helperText } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-2">
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
      <Input
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;

          const isValid =
            TextFieldFormElement.validate(element, e.target.value);
          setError(!isValid);

          if (!isValid) return;

          submitValue(element.id, e.target.value);
        }}
        value={value} />
      {helperText && (
        <p className={cn("text-muted-foreground text-[0.75rem]",
          error && "text-destructive")}>
          {helperText}
        </p>
      )}
    </div>
  );
}