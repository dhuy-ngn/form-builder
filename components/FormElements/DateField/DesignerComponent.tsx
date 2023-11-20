import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/types/FormElement";
import { Calendar } from "lucide-react";
import { CustomInstance } from ".";

export default function DesignerComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
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
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal text-muted-foreground">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Pick a date</span>
      </Button>
      {helperText && (
        <p className="text-muted-foreground text-[0.75rem]">
          {helperText}
        </p>
      )}
    </div>
  );
}