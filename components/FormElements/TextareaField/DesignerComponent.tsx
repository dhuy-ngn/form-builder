import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder } = element.extraAttributes;
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
      <Textarea readOnly disabled placeholder={placeholder} rows={3} />
    </div>
  );
}