'use client';

import { ReactNode, useState } from 'react';
import FormDesignerContext from './FormDesignerContext';
import { FormElementInstance } from './FormElement';

export default function FormDesignerContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
  };
  return (
    <FormDesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement
      }}>
      {children}
    </FormDesignerContext.Provider>
  );
}