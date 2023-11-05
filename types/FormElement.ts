import { TextFieldFormElement } from '@/components/FormDesignerElements/TextField';

export type ElementTypes = 'TextField';

export type FormElement = {
  type: ElementTypes;
  construct: (id: string) => FormElementInstance;
  designerSidebarButtonElement: {
    icon: React.ReactElement;
    label: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
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
  TextField: TextFieldFormElement
};
