import { FormElement } from "@/types/FormElement";
import { Icon } from "@radix-ui/react-select";
import { Button } from "../ui/button";

function FormDesignerSidebarButtonDragOverlay(
  { formElement }: { formElement: FormElement; }
) {
  const { label, icon } = formElement.designerButtonElement;
  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] 2-[120px] cursor-grab">
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default FormDesignerSidebarButtonDragOverlay;