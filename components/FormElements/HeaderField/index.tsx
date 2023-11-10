import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { Heading1 } from "lucide-react";
import { z } from "zod";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "HeaderField";

export const extraAtrributes = {
  title: "Header",
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

export const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const HeaderFieldFormElement: FormElement = {
  type: 'HeaderField',
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerSidebarButtonElement: {
    icon: <Heading1 />,
    label: "Header"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
};