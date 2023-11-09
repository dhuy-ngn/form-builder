"use client";

import { SubmitForm } from "@/actions/FormActions";
import { FormElementInstance, FormElements } from "@/types/FormElement";
import { Loader2, Send } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

type FormSubmitWrapperProps = {
  formUrl: string;
  content: FormElementInstance[];
};

function FormSubmitWrapper({
  formUrl,
  content
}: FormSubmitWrapperProps) {
  const formValues = useRef<{ [key: string]: string; }>({});
  const formErrors = useRef<{ [key: string]: boolean; }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const isValid = FormElements[field.type].validate(field, actualValue);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }

      if (Object.keys(formErrors.current).length > 0) {
        return false;
      }

      return true;
    }
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const isFormValid = validateForm();

    if (!isFormValid) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Form is currently not valid. Please double check the value and try again.",
        variant: "destructive"
      });
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive"
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-primary rounded">
          <h1 className="text-xl font-bold">Form submitted!</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-primary rounded">
        {content.map(element => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]} />
          );
        })}

        <Button
          className="flex flex-row gap-2 justify-center items-center"
          onClick={() => {
            submitForm();
          }}
          disabled={pending}>
          {!pending && (
            <>
              <Send className="h-4 w-4" />
              Submit
            </>
          )}
          {pending && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitWrapper;