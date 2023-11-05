import { FormElement } from "@/types/FormElement";
import { Button } from "../ui/button";

function FormDesignerSidebarButtonDragOverlay(
  { formElement }: { formElement: FormElement; }
) {
  const { label, icon } = formElement.designerSidebarButtonElement;
  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default FormDesignerSidebarButtonDragOverlay;