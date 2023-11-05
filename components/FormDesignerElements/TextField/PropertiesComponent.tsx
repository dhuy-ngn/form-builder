import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElementInstance } from "@/types/FormElement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomInstance, propertiesFormSchemaType, propertiesSchema } from ".";

export default function PropertiesComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const { updateElement } = useFormDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder
    }
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { label, helperText, placeholder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        placeholder: placeholder,
        required: required,
      }
    });
  };

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3">

        {/* Label field */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displated above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}></FormField>
      </form>
    </Form>
  );
}