import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.75rem]">
          {helperText}
        </p>
      )}
    </div>
  );
}