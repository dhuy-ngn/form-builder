import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElements } from "@/types/FormElement";
import { X } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Separator } from "../../../../../components/ui/separator";

function FormDesignerSidebarElementProperties() {
  const { selectedElement, setSelectedElement } = useFormDesigner();

  const PropertiesForm = FormElements[selectedElement!.type].propertiesComponent;
  return (
    <div
      className="flex flex-col p-2">
      <div className="flex justify-between items-center h-[40px] space-y-0.5">
        <p className="text-md text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:bg-transparent hover:opacity-100 opacity-70"
          onClick={() => {
            setSelectedElement(null);
          }}>
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement!} />
    </div>
  );
}

export default FormDesignerSidebarElementProperties;;