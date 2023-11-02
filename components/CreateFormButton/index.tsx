"use client";

import { CreateForm } from "@/actions/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { FilePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormSchema, FormSchemaType } from "../../schemas/form";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

function CreateFormButton() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  });
  const router = useRouter();

  async function onSubmit(values: FormSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully"
      });
      router.push(`/forms/${formId}/build`);
    } catch (error) {
      toast({
        title: "An unexpected error occured",
        description: "Something went wrong, please try again later",
        variant: "destructive"
      });
      console.log({ error });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background">
          <FilePlus
            className="h-8 w-8 text-muted-foreground/60 group-hover:text-primary-foreground" />
          <p
            className="font-bold text-xl text-muted-foreground/60 group-hover:text-primary-foreground">
            Create new Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Form
          </DialogTitle>
          <DialogDescription>
            Create a new Form to start collecting responses
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )} />
          </form>
        </Form>

        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4">
            {
              !form.formState.isSubmitting
                ? <span>Save</span>
                : <Loader2 />
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormButton;