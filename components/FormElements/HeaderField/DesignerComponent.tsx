import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        className="flex flex-row gap-0.5 text-2xl font-bold">
        {title}
      </Label>
    </div>
  );
}