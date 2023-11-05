"use client";

import useFormDesigner from "@/hooks/useFormDesigner";
import { FormElements } from "@/types/FormElement";
import { Fullscreen } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

function PreviewDialogButton() {
  const { elements } = useFormDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <Fullscreen className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[40%] min-w-[500px] flex flex-col flex-grow p-0 gap-0">
        <div
          className="px-4 py-2 border-b bg-muted/10">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
          <p className="text-sm font-bold text-muted-foreground">
            This is how your form will look like to surveyees.
          </p>
        </div>
        <div
          className="bg-repeat bg-muted/80 h-full heropattern-graphpaper-muted-focus/20">
          <div
            className="dark:bg-muted-focus/20 bg-muted-focus/60 mx-16 my-10 min-h-[500px] rounded-lg">
            {elements.map(element => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default PreviewDialogButton;