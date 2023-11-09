"use client";

import useFormDesigner from "@/hooks/useFormDesigner";
import { DndContext, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { ArrowLeft, ArrowRight, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import FormDesigner from "./FormDesigner";
import FormDesignerSidebarButtonDragOverlayWrapper from "./FormDesignerSidebarButtonDragOverlayWrapper";
import PreviewDialogButton from "./PreviewDialogButton";
import PublishFormButton from "./PublishFormButton";
import SaveFormButton from "./SaveFormButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type FormBuilderProps = {
  form: Form;
};

function FormBuilder({
  form
}: FormBuilderProps) {
  const { setElements } = useFormDesigner();
  const [isReady, setIsReady] = useState(false);
  const [isCopyLinkButtonClicked, setIsCopyLinkButtonClicked] = useState(false);
  // delay when copy link button changes from "Link copied!" to the default button
  const copyLinkButtonDelay = 2500;

  const droppable = useDroppable({
    id: 'droppable',
    data: {
      isDesignerDropArea: true,
    }
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, setElements]);

  useEffect(() => {
    let copyLinkTimer = setTimeout(() =>
      setIsCopyLinkButtonClicked(false), copyLinkButtonDelay);

    return () => clearTimeout(copyLinkTimer);
  }, [isCopyLinkButtonClicked === true]);

  if (!isReady) {
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader2 className="animation-spin h-12 w-12" />
    </div>;
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-col w-[40%] items-center justify-center">
            <h1 className="text-center text-4xl font-bold text-primary pb-2 mb-10">
              🙌🙌 Form Published! 🙌🙌
            </h1>
            <Separator className="mb-8 -mt-4" />
            <h2 className="text-xl">Share this form</h2>
            <h3 className="text-md text-muted-foreground pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-row gap-2 items-center w-full border-b pb-4">
              <Input className="" readOnly value={shareUrl} />
              <Button
                className="ml-2 flex flex-row gap-2 w-[150px] items-center justify-center"
                onClick={() => {
                  setIsCopyLinkButtonClicked(true);
                  navigator.clipboard.writeText(shareUrl);
                }}>
                {
                  isCopyLinkButtonClicked
                    ? <span>Link copied!</span>
                    : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy link</span>
                      </>
                    )
                }
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link
                  href={'/'}
                  className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link
                  href={`/forms/${form.id}}/details`}
                  className="gap-2">
                  Form details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full p-4">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">
              Form:
            </span>
            <span className="font-semibold">
              {form.name}
            </span>
          </h2>

          <div
            className="flex items-center gap-2">
            <PreviewDialogButton />
            {
              !form.published && (
                <>
                  <SaveFormButton id={form.id} />
                  <PublishFormButton id={form.id} />
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