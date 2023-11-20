import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElementInstance } from "@/types/FormElement";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
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
      required: element.extraAttributes.required,
      options: element.extraAttributes.options,
    }
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { label, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        required: required,
        options: options
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

        {/* Options */}
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault(); // avoid submit
                    form.setValue(
                      "options",
                      field.value.concat(`Option ${field.value.length + 1}`));
                  }}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div key={index}
                    className="flex items-center justify-between gap-1">
                    <Input
                      value={option}
                      onChange={e => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }} />
                    <Button
                      variant={"destructive"}
                      disabled={field.value.length === 1}
                      onClick={e => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                List of options to choose from. <br />
                Must have at least one item.
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
                  Surveyees must pick at least one option.
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