import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder
    }
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { label, placeholder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: label,
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
                Displays <b>above</b> the field. <br /> Describe what this field is for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />

        {/* Placeholder field */}
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Displays <b>inside</b> the field. <br /> You can add some hints or any examples.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />

        {/* Required */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem
              className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required field</FormLabel>
                <FormDescription>
                  This field cannot be left empty on submit.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </form>
    </Form>
  );
}