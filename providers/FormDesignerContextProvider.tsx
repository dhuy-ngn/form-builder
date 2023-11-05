'use client';

import { filter, findIndex } from 'lodash';
import { ReactNode, useState } from 'react';
import FormDesignerContext from '../contexts/FormDesignerContext';
import { FormElementInstance } from '../types/FormElement';

export default function FormDesignerContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement]
    = useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => filter(elements, (e) => e.id !== id));

  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = findIndex(newElements, { id: id });
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <FormDesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
      }}>
      {children}
    </FormDesignerContext.Provider>
  );
}