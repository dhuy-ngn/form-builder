import { Dispatch, SetStateAction, createContext } from 'react';
import { FormElementInstance } from '../types/FormElement';

type FormDesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

const FormDesignerContext = createContext<FormDesignerContextType | null>(null);

export default FormDesignerContext;
