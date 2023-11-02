import { FormElements } from "@/types/FormElement";
import FormDesignerSidebarButton from "../FormDesignerSidebarButton";

function FormDesignerSidebar() {

  return (
    <aside className="w-[560px] max-w-[560px] flex flex-col flex-grow gap-2 border-l-2 border-muted-focus p-4 bg-muted overflow-y-auto h-full">
      Elements
      <div
        className="grid grid-cols-2 gap-2 xs:grid-cols-1">
        <FormDesignerSidebarButton
          formElement={FormElements.input} />
        <FormDesignerSidebarButton
          formElement={FormElements.textarea} />
      </div>
    </aside>
  );
}

export default FormDesignerSidebar;