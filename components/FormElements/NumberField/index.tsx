import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { Binary } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "NumberField";
export type SubmitFunction = (key: string, value: string) => void;

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

export const NumberFieldFormElement: FormElement = {
  type: 'NumberField',
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <Binary />,
    label: "Number"
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

    return true;
  }
};