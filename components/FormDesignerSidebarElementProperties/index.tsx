import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElements } from "@/types/FormElement";
import { X } from "lucide-react";
import { Button } from "../ui/button";

function FormDesignerSidebarElementProperties() {
  const { selectedElement, setSelectedElement } = useFormDesigner();

  const PropertiesForm = FormElements[selectedElement!.type].formComponent;
  return (
    <div
      className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}>
          <X />
        </Button>
      </div>
      <PropertiesForm />
    </div>
  );
}

export default FormDesignerSidebarElementProperties;