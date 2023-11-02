import { ElementTypes, FormElement, FormElementInstance } from "@/types/FormElement";
import { FormInput } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const type: ElementTypes = "input";

const extraAtrributes = {
  label: "Input",
  helperText: "Helper text",
  required: false,
  placeholder: "Enter value here..."
};

export const InputFormElement: FormElement = {
  type: 'input',
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAtrributes
  }),
  designerButtonElement: {
    icon: <FormInput />,
    label: "Input"
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAtrributes;
};

function DesignerComponent(
  {
    elementInstance
  }: {
    elementInstance: FormElementInstance;
  }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="text-white">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
    </div>
  );
}