import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CustomInstance, MultiselectFieldFormElement, SubmitFunction } from ".";

export default function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, options } = element.extraAttributes;

  const [value, setValue] = useState<string[]>([]);
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
      {options.map((option, index) => {
        const id = `checkbox-${element.id}-${index}`;
        return (
          <div key={index} className="flex flex-row gap-2 w-full">
            <Checkbox
              id={id}
              className="border-primary-foreground"
              onCheckedChange={checked => {
                const updatedValue = [...value];
                if (checked) {
                  updatedValue.push(option);
                } else {
                  updatedValue.splice(updatedValue.indexOf(option), 1);
                }
                setValue(updatedValue);
                const stringifiedValue = JSON.stringify(updatedValue);
                if (!submitValue) return;
                const isValid = MultiselectFieldFormElement
                  .validate(element, stringifiedValue);
                setError(!isValid);
                submitValue(element.id, stringifiedValue);
              }} />
            <Label
              className="flex flex-col gap-1 font-light">
              {option}
            </Label>
          </div>
        );
      })}
    </div>
  );
}