import { ElementTypes, FormElement } from "@/types/FormElement";
import { Text } from "lucide-react";

const type: ElementTypes = "textarea";

export const TextAreaFormElement: FormElement = {
  type: 'textarea',
  construct: (id: string) => ({
    id, type, extraAttributes: {
      label: "Text Area",
      helperText: "Helper text",
      required: false,
      placeholder: "Enter value here..."
    }
  }),
  designerButtonElement: {
    icon: <Text />,
    label: "Text Area"
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};