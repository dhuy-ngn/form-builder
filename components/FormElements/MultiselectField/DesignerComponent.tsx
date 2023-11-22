import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, options } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        className="flex flex-row gap-0.5">
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
              className="border-primary-foreground" />
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