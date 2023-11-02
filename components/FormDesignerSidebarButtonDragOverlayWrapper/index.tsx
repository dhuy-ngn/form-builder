"use client";

import { ElementTypes, FormElements } from "@/types/FormElement";
import { Active, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import FormDesignerSidebarButtonDragOverlay from "../FormDesignerSidebarButtonDragOverlay";

function FormDesignerSidebarButtonDragOverlayWrapper() {
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

  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement;

  let node = <></>;

  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementTypes;
    node = <FormDesignerSidebarButtonDragOverlay
      formElement={FormElements[type]} />;
  }
  return (
    <div>

    </div>
  );
}

export default FormDesignerSidebarButtonDragOverlayWrapper;