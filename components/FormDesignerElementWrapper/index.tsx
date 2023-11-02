"use client";

import useFormDesigner from "@/hooks/useFormDesigner";
import { cn } from "@/lib/utils";
import { FormElementInstance, FormElements } from "@/types/FormElement";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function FormDesignerElementWrapper({ element }: { element: FormElementInstance; }) {
  const { removeElement } = useFormDesigner();
  const [isMouseOver, setIsMouseOver] = useState(false);
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
  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}>
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2" />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2" />
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
          </>
        )
      }
      <div className="absolute right-0 h-full">
        <Button className={cn("flex justify-center h-full border rounded-md rounded-l-none bg-destructive/80",
          isMouseOver && "opacity-30")}
          onClick={() => removeElement(element.id)}>
          <Trash2
            className="h-6 w-6 text-destructive-foreground" />
        </Button>
      </div>
      <div
        className="flex w-full h-[120px] items-center rounded-md bg-muted/40 px-4 py-2 pointer-events-none">
        <DesignerElement
          elementInstance={element} />
      </div>
    </div>
  );
}