import useFormDesigner from "@/hooks/useFormDesigner";
import { cn } from "@/lib/utils";
import { ElementTypes, FormElements } from "@/types/FormElement";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import FormDesignerElementWrapper from "../FormDesignerElementWrapper";
import FormDesignerSidebar from "../FormDesignerSidebar";

function FormDesigner() {
  const { elements, addElement } = useFormDesigner();
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

      if (isDesignerButtonElement) {
        const type = active.data?.current?.type;

        const newElement = FormElements[type as ElementTypes].construct(
          (Math.random() * 10001).toString()
        );

        addElement(0, newElement);
      }
    },
  });

  return (
    <div
      className="flex w-full h-full">
      <div className="p-4 w-full h-full">
        <div
          ref={setNodeRef}
          className={cn("bg-muted-focus/50 max-w-[800px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            isOver && "ring-2 ring-primary/20"
          )}>

          {
            isOver && (
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
                {elements.map(element => (
                  <FormDesignerElementWrapper
                    key={element.id}
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