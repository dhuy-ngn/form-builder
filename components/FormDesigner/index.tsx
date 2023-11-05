import useFormDesigner from "@/hooks/useFormDesigner";
import IdGenerator from "@/lib/IdGenerator";
import { cn } from "@/lib/utils";
import { ElementTypes, FormElements } from "@/types/FormElement";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { findIndex } from "lodash";
import FormDesignerElementWrapper from "../FormDesignerElementWrapper";
import FormDesignerSidebar from "../FormDesignerSidebar";

function FormDesigner() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement
  } = useFormDesigner();
  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement = active.data?.current?.isDesignerButtonElement;
      const isDroppingOverFormDesignerDropArea = over.data?.current?.isDesignerDropArea;

      // Dropping a Sidebar Element Button over the Designer drop zone 
      // >> Push the item
      const droppingSidebarButtonOverDesignerArea =
        isDesignerButtonElement && isDroppingOverFormDesignerDropArea;
      if (droppingSidebarButtonOverDesignerArea) {
        const type = active.data?.current?.type;

        const newElement = FormElements[type as ElementTypes].construct(
          IdGenerator()
        );

        addElement(elements.length, newElement);
      }

      // Dropping a Sidebar Element Button over the elements in the Drop zone
      // >> Find which index to insert then insert before or after that element
      // based on the position of the drop
      const isDroppingOverTopHalfDesignerElement =
        over?.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverBottomHalfDesignerElement =
        over?.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverBottomHalfDesignerElement || isDroppingOverTopHalfDesignerElement;

      const droppingSidebarButtonOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      if (droppingSidebarButtonOverDesignerElement) {
        const type = active.data?.current?.type;

        const newElement = FormElements[type as ElementTypes].construct(
          IdGenerator()
        );

        const overElementId = over.data?.current?.elementId;
        const overElementIndex = findIndex(elements, { id: overElementId });
        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let newElementIndex = overElementIndex; // Insert on top-half
        if (isDroppingOverBottomHalfDesignerElement) {
          newElementIndex = overElementIndex + 1;
        }

        addElement(newElementIndex, newElement);
        return;
      }

      // Dragging an already existed element over another one
      // >> Update index based on the drop position by deleting the item with the old index and add the item with the new index
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeElementId = active.data?.current?.elementId;
        const activeElementIndex = findIndex(elements, { id: activeElementId });

        const overElementId = over.data?.current?.elementId;
        const overElementIndex = findIndex(elements, { id: overElementId });
        if (overElementIndex === -1 || activeElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeElementId);

        let newElementIndex = overElementIndex; // Insert on top-half
        if (isDroppingOverBottomHalfDesignerElement) {
          newElementIndex = overElementIndex + 1;
        }
        addElement(newElementIndex, activeElement);
      }

      // Dragging an already existed element over the Design drop zone
      // >> Set the item's index to be the last
      const draggingDesignerElementOverDesignerArea =
        isDroppingOverFormDesignerDropArea && isDraggingDesignerElement;
      if (draggingDesignerElementOverDesignerArea) {
        const activeElementId = active.data?.current?.elementId;
        const activeElementIndex = findIndex(elements, { id: activeElementId });
        const activeElement = { ...elements[activeElementIndex] };

        removeElement(activeElementId);
        addElement(elements.length, activeElement);
      }
    },
  });

  return (
    <div
      className="flex w-full h-full">
      <div className="p-4 w-full"
        onClick={() => {
          if (selectedElement)
            setSelectedElement(null);
        }}>
        <div
          ref={setNodeRef}
          className={cn("bg-muted-focus/50 max-w-[800px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            isOver && "ring-2 ring-primary/20"
          )}>

          {
            isOver && elements.length === 0 && (
              <div className="p-4 w-full">
                <div className="h-[120px] rounded-md bg-muted"></div>
              </div>
            )
          }
          {
            !isOver && elements.length === 0 && (
              <p className="text-lg text-muted-foreground flex flex-grow items-center font-bold">
                Drop items here...
              </p>
            )}
          {
            elements.length > 0 && (
              <div className="flex flex-col text-background w-full gap-2 p-4">
                {elements.map((element, index) => (
                  <FormDesignerElementWrapper
                    key={index}
                    element={element} />
                ))}
              </div>
            )
          }
        </div>
      </div>

      <FormDesignerSidebar />
    </div>
  );
}

export default FormDesigner;