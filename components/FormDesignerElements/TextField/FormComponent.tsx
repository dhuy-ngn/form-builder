import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function FormComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }
) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full p-6">
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
      <Input placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.75rem]">
          {helperText}
        </p>
      )}
    </div>
  );
}