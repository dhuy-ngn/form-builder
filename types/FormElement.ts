import { HeaderFieldFormElement } from '@/components/FormElements/HeaderField';
import { SeparatorFieldFormElement } from '@/components/FormElements/SeparatorField';
import { SubheaderFieldFormElement } from '@/components/FormElements/SubheaderField';
import {
  SubmitFunction,
  TextFieldFormElement
} from '@/components/FormElements/TextField';
import { TextareaFieldFormElement } from '@/components/FormElements/TextareaField';

export type ElementTypes =
  | 'TextField'
  | 'HeaderField'
  | 'SubheaderField'
  | 'TextareaField'
  | 'SeparatorField';

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
  TextField: TextFieldFormElement,
  HeaderField: HeaderFieldFormElement,
  SubheaderField: SubheaderFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  SeparatorField: SeparatorFieldFormElement
};
