import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CheckboxFieldFormElement, CustomInstance, SubmitFunction } from ".";

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
  const { label, required, helperText } = element.extraAttributes;

  const [value, setValue] = useState<boolean>(defaultValue === "true");
  const [error, setError] = useState(false);
  const id = `checkbox-${element.id}`;


  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-row gap-2 w-full px-6 py-2">
      <Checkbox id={id}
        checked={value}
        className={cn(
          error && "border-destructive",
          "border-primary-foreground")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          setValue(value);
          if (!submitValue) return;
          const stringifiedValue = value ? "true" : "false";
          const isValid = CheckboxFieldFormElement.validate(
            element,
            stringifiedValue);
          setError(!isValid);
          submitValue(element.id, stringifiedValue);
        }} />
      <div className="grid gap-1.5 leading-none">
        <Label
          className={cn("flex flex-col gap-0.5",
            error && "text-destructive")}>
          {label}
          {required && (
            <span
              className="text-destructive">
              *
            </span>
          )}
        </Label>
        {helperText && (
          <p className={cn("text-muted-foreground text-[0.75rem]",
            error && "text-destructive")}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}