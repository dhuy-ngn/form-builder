import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CustomInstance } from ".";

export default function FormComponent({
  elementInstance,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label } = element.extraAttributes;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full p-6">
      <Label
        className={cn("flex flex-row gap-0.5 ",
          error && "text-destructive")}>
        {label}
      </Label>
    </div>
  );
}