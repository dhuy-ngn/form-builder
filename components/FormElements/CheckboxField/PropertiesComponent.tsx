import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElementInstance } from "@/types/FormElement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomInstance, propertiesFormSchemaType, propertiesSchema } from ".";

export default function PropertiesComponent(
  { elementInstance }: { elementInstance: FormElementInstance; }) {
  const { updateElement, setSelectedElement } = useFormDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    }
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        required: required,
      }
    });

    toast({
      title: "Success",
      description: "Property saved successfully"
    });

    setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit(applyChanges)
      }
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

        {/* Helper text */}
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Displays <b>below</b> the field. <br /> Give the surveyee an idea on how this field is used.
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

        <Separator />
        <Button
          className="w-full"
          variant={"default"}
          type="submit">
          Save
        </Button>
      </form>
    </Form >
  );
}