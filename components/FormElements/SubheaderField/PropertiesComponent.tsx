import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
      title: element.extraAttributes.label,
    }
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title: title,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </form>
    </Form>
  );
}