import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types/FormElement";
import { format } from "date-fns";
import { Calendar as LucideCalendar } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomInstance, DateFieldFormElement, SubmitFunction } from ".";

export default function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;

  const [value, setValue] = useState<Date | undefined>
    (defaultValue ? new Date(defaultValue) : undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-2">
      <Label
        className={cn("flex flex-row gap-0.5",
          error && "text-destructive")}>
        {label}
        {required && (
          <span
            className="text-destructive">
            *
          </span>
        )}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive")}>
            <LucideCalendar className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(value) => {
              setValue(value);

              if (!submitValue) return;
              const date = value?.toUTCString() || "";
              const isValid = DateFieldFormElement.validate(element, date);

              setError(!isValid);
              submitValue(element.id, date);
            }} />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p className={cn("text-muted-foreground text-[0.75rem]",
          error && "text-destructive")}>
          {helperText}
        </p>
      )}
    </div>
  );
}