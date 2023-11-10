import { ElementTypes, FormElement } from "@/types/FormElement";
import { Minus } from "lucide-react";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementTypes = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type: 'SeparatorField',
  construct: (id: string) => ({
    id,
    type,
  }),
  designerSidebarButtonElement: {
    icon: <Minus />,
    label: "Separator"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
};