import { Separator } from "@/components/ui/separator";
import { FormElementInstance } from "@/types/FormElement";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Separator className="w-[90%]" />
    </div>
  );
}