"use client";

import { DndContext, useDroppable } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import FormDesigner from "../FormDesigner";
import FormDesignerSidebarButtonDragOverlayWrapper from "../FormDesignerSidebarButtonDragOverlayWrapper";
import PreviewDialogButton from "../PreviewDialogButton";
import PublishFormButton from "../PublishFormButton";
import SaveFormButton from "../SaveFormButton";

type FormBuilderProps = {
  form: Form;
};

function FormBuilder({
  form: {
    name,
    published
  }
}: FormBuilderProps) {
  const droppable = useDroppable({
    id: 'droppable',
    data: {
      isDesignerDropArea: true,
    }
  });
  return (
    <DndContext>
      <main className="flex flex-col w-full p-4">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">
              Form:
            </span>
            <span className="font-semibold">
              {name}
            </span>
          </h2>

          <div
            className="flex items-center gap-2">
            <PreviewDialogButton />
            {
              !published && (
                <>
                  <SaveFormButton />
                  <PublishFormButton />
                </>
              )
            }
          </div>
        </nav>

        <div
          className="flex flex-grow items-center justify-center relative overflow-y-auto h-[1000px] bg-muted/80 my-5 mx-3 rounded-xl">
          <div
            className="bg-repeat w-full h-full heropattern-graphpaper-muted-focus/20">
            <FormDesigner />
          </div>
        </div>
      </main>

      <FormDesignerSidebarButtonDragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;