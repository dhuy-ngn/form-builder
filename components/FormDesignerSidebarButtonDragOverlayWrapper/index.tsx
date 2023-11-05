"use client";

import useFormDesigner from "@/hooks/useFormDesigner";
import { ElementTypes, FormElements } from "@/types/FormElement";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import FormDesignerSidebarButtonDragOverlay from "../FormDesignerSidebarButtonDragOverlay";

import { find } from 'lodash';

function FormDesignerSidebarButtonDragOverlayWrapper() {
  const { elements } = useFormDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    }
  });

  if (!draggedItem) return;

  let node = <></>;
  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementTypes;
    node = <FormDesignerSidebarButtonDragOverlay
      formElement={FormElements[type]} />;
  }
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = find(elements, { 'id': elementId });

    if (!element) node = <></>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;

      node = (
        <div
          className="flex bg-muted border rounded-md h-[120px] w-full py-2 px-4 opacity-60 pointer pointer-events-none"
        >
          <DesignerElementComponent elementInstance={element} />
        </div>);
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default FormDesignerSidebarButtonDragOverlayWrapper;