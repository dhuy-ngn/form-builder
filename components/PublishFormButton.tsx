import { PublishForm, UpdateForm } from "@/actions/FormActions";
import useFormDesigner from "@/hooks/useFormDesigner";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

function PublishFormButton({ id }: { id: number; }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { elements } = useFormDesigner();

  const publishForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateForm(id, jsonElements).then(() => PublishForm(id));
      toast({
        title: "Success",
        description: "Your form has been saved"
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"default"} className="gap-2">
          <Upload className="h-4 w-4" />
          Save and Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to publish this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you can no longer be able to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By <u>publishing</u> this form, you will make it available to the public and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}>
            Proceed
            {loading && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormButton;