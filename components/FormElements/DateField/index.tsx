import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { Calendar } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "DateField";
export type SubmitFunction = (key: string, value: string) => void;

export const extraAtrributes = {
  label: "Date",
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
  placeholder: z.string().max(50)
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <Calendar />,
    label: "Date"
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