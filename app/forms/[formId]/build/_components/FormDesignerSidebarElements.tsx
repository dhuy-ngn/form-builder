import { FormElements } from "@/types/FormElement";
import { Separator } from "../../../../../components/ui/separator";
import FormDesignerSidebarButton from "./FormDesignerSideButton";

function FormDesignerSidebarElements() {
  return (
    <div
      className="flex flex-col p-2">
      <div className="flex justify-between items-center h-[40px] space-y-0.5">
        <p className="text-md text-foreground/70">Drag and drop elements</p>
      </div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Form elements</p>
        <FormDesignerSidebarButton formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default FormDesignerSidebarElements;