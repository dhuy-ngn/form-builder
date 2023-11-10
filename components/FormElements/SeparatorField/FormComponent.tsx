import { Separator } from "@/components/ui/separator";
import { FormElementInstance } from "@/types/FormElement";
import { useEffect, useState } from "react";

export default function FormComponent({
  elementInstance,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as FormElementInstance;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full p-6">
      <Separator className="w-full h-full my-4" />
    </div>
  );
}