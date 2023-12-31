import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText, rows } = element.extraAttributes;
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
      <Textarea rows={rows} readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.75rem]">
          {helperText}
        </p>
      )}
    </div>
  );
}