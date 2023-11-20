import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { ChevronDownSquare } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "SelectField";
export type SubmitFunction = (key: string, value: string) => void;

export const extraAtrributes = {
  label: "Select",
  helperText: "Helper text",
  required: false,
  placeholder: "Choose a value",
  options: ["Option 1"]
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([])
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <ChevronDownSquare />,
    label: "Select"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ) => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return element.extraAttributes.options.length > 0;
  }
};