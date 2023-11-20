import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { CheckIcon } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "CheckboxField";
export type SubmitFunction = (key: string, value: string) => void;

export const extraAtrributes = {
  label: "Checkbox",
  helperText: "Helper text",
  required: false,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <CheckIcon />,
    label: "Checkbox"
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
      return currentValue !== "true";
    }

    return element.extraAttributes.options.length > 0;
  }
};