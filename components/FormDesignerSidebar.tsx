import useFormDesigner from "@/hooks/useFormDesigner";
import FormDesignerSidebarElementProperties from "./FormDesignerSidebarElementProperties";
import FormDesignerSidebarElements from "./FormDesignerSidebarElements";

function FormDesignerSidebar() {
  const { selectedElement } = useFormDesigner();
  return (
    <aside className="w-[560px] max-w-[560px] flex flex-col flex-grow gap-2 border-l-2 border-muted-focus p-4 bg-muted overflow-y-auto h-full">
      {
        /**If there are a selected Form Element, change sidebar to property modifier, else show a list of components */
      }
      {
        selectedElement
          ? <FormDesignerSidebarElementProperties />
          : <FormDesignerSidebarElements />
      }
    </aside>
  );
}

export default FormDesignerSidebar;