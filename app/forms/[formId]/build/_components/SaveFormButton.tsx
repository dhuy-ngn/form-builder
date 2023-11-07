import { UpdateForm } from "@/actions/FormActions";
import useFormDesigner from "@/hooks/useFormDesigner";
import { Loader2, Save } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../../../../../components/ui/button";
import { toast } from "../../../../../components/ui/use-toast";

function SaveFormButton({ id }: { id: number; }) {
  const { elements } = useFormDesigner();
  const [loading, startTransition] = useTransition();

  const updateForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateForm(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateForm);
      }}>
      {
        loading
          ? <Loader2 className="animate-spin h-4 w-4" />
          : <Save className="h-4 w-4" />
      }
      Save
    </Button>
  );
}

export default SaveFormButton;