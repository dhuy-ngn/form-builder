import { createContext } from 'react';
import { FormElementInstance } from './FormElement';

type FormDesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
};

const FormDesignerContext = createContext<FormDesignerContextType | null>(null);

export default FormDesignerContext;
