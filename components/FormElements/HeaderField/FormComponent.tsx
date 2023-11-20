import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";
import { CustomInstance } from ".";

export default function FormComponent({
  elementInstance,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-2">
      <Label
        className={cn("flex flex-row gap-0.5 text-2xl font-bold",
          error && "text-destructive")}>
        {title}
      </Label>
    </div>
  );
}