"use client";

import useFormDesigner from "@/hooks/useFormDesigner";
import { cn } from "@/lib/utils";
import { FormElementInstance, FormElements } from "@/types/FormElement";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";

export default function FormDesignerElementWrapper(
  { element }: { element: FormElementInstance; }) {
  const {
    removeElement,
    selectedElement,
    setSelectedElement
  } = useFormDesigner();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isSelected = selectedElement?.id === element.id;
  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  });

  const { setNodeRef, listeners, attributes, isDragging } =
    useDraggable({
      id: element.id + '-drag-handler',
      data: {
        type: element.type,
        elementId: element.id,
        isDesignerElement: true,
      }
    });

  if (isDragging) return;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn("relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-muted-focus ring-inset bg-muted",
        isSelected && "ring-primary ring-2")}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}>
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2" />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0" />
      {
        isMouseOver && (
          <>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p
                className="text-muted-foreground text-sm">
                Click for properties or drag to move
              </p>
            </div>

            <div className="absolute right-0 h-full">
              <Button
                variant={"destructive"}
                className="flex justify-center h-full border rounded-md rounded-l-none bg-destructive/80 opacity-80 hover:opacity-100 hover:bg-destructive"
                onClick={(e) => {
                  // avoid element to be selected while deleting
                  e.stopPropagation();
                  removeElement(element.id);
                }}>
                <Trash2
                  className="h-6 w-6 text-destructive-foreground" />
              </Button>
            </div>
          </>
        )
      }
      {
        topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md h-[5px] bg-primary rounded-b-none" />
        )
      }
      {
        bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md h-[5px] bg-primary rounded-t-none" />
        )
      }
      <div
        className={cn("flex w-full h-[120px] items-center rounded-md bg-muted/40 px-4 py-2 pointer-events-none",
          isMouseOver && "opacity-20")}>
        <DesignerElement
          elementInstance={element} />
      </div>
    </div>
  );
}