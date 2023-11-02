import { InputFormElement } from '@/components/FormDesignerElements/Input';
import { TextAreaFormElement } from '@/components/FormDesignerElements/TextArea';

export type ElementTypes = 'input' | 'textarea';

export type FormElement = {
  type: ElementTypes;
  construct: (id: string) => FormElementInstance;
  designerButtonElement: {
    icon: React.ReactElement;
    label: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementTypes;
  extraAttributes?: Record<string, any>;
};

type FormElementTypes = {
  [key in ElementTypes]: FormElement;
};

export const FormElements: FormElementTypes = {
  input: InputFormElement,
  textarea: TextAreaFormElement
};
