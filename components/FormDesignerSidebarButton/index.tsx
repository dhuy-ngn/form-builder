import { cn } from "@/lib/utils";
import { FormElement } from "@/types/FormElement";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";

type FormDesignerSidebarButtonProps = {
  formElement: FormElement;
};

function FormDesignerSidebarButton({
  formElement
}: FormDesignerSidebarButtonProps) {
  const { label, icon } = formElement.designerSidebarButtonElement;
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
        isDragging && 'ring-2 ring-primary')}>
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default FormDesignerSidebarButton;