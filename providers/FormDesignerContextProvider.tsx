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
    const updatedElements = [...elements];
    updatedElements.splice(index, 0, element);
    setElements([...updatedElements]);
  };

  const removeElement = (id: string) => {
    const updatedElements = filter(elements, (e) => e.id !== id);
    setElements([...updatedElements]);
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    const updatedItemIndex = findIndex(elements, { id: id });
    const updatedElements = [...elements];
    updatedElements.splice(updatedItemIndex, 0, element);

    setElements(updatedElements);
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