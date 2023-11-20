import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { CheckSquare } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "MultiselectField";
export type SubmitFunction = (key: string, value: string) => void;

export const extraAtrributes = {
  label: "Multiselect",
  required: false,
  options: ["Option 1"]
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  required: z.boolean().default(false),
  options: z.array(z.string()).default([])
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const MultiselectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <CheckSquare />,
    label: "Multiselect"
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
      const options = JSON.parse(currentValue) as Array<string>;
      return options.length > 0;
    }

    return extraAtrributes.options.length > 0;
  }
};