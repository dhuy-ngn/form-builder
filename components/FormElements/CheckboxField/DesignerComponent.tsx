import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex flex-row gap-2 w-full">
      <Checkbox id={id} className="border-primary-foreground" />
      <div className="grid gap-1.5 leading-none">
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
        {helperText && (
          <p className="text-muted-foreground text-[0.75rem]">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}