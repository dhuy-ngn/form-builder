import {
  SubmitFunction,
  TextFieldFormElement
} from '@/components/FormElements/TextField';

export type ElementTypes = 'TextField';

export type FormElement = {
  type: ElementTypes;
  construct: (id: string) => FormElementInstance;
  designerSidebarButtonElement: {
    icon: React.ReactElement;
    label: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
