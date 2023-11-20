import useFormDesigner from "@/hooks/useFormDesigner";
import IdGenerator from "@/lib/IdGenerator";
import { cn } from "@/lib/utils";
import { ElementTypes, FormElement, FormElements } from "@/types/FormElement";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";

type FormDesignerSidebarButtonProps = {
  formElement: FormElement;
};

function FormDesignerSidebarButton({
  formElement
}: FormDesignerSidebarButtonProps) {
  const { label, icon } = formElement.designerSidebarButtonElement;
  const { addElement, setSelectedElement, elements } = useFormDesigner();
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true
    }
  });
  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant={"outline"}
      className={cn("flex flex-col gap-2 h-[120px] cursor-grab w-full",
        isDragging && 'ring-2 ring-primary')}
      onDoubleClick={() => {
        const type = formElement.type;

        const newElement = FormElements[type as ElementTypes]
          .construct(IdGenerator());
        addElement(elements.length, newElement);
        setSelectedElement(newElement);
      }}>
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default FormDesignerSidebarButton;