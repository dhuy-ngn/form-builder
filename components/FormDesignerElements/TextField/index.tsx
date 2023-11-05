import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { FormInput } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "TextField";

export const extraAtrributes = {
  label: "Input",
  helperText: "Helper text",
  required: false,
  placeholder: "Enter value here..."
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50)
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const TextFieldFormElement: FormElement = {
  type: 'TextField',
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <FormInput />,
    label: "Input"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};