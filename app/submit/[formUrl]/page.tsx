import { GetFormContentByUrl } from "@/actions/FormActions";
import FormSubmitWrapper from "@/components/FormSubmitWrapper";
import { FormElementInstance } from "@/types/FormElement";

type FormSubmitPageProps = {
  params: {
    formUrl: string;
  };
};

async function FormSubmitPage({
  params
}: FormSubmitPageProps) {
  const { formUrl } = params;
  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitWrapper formUrl={formUrl} content={formContent} />
  );
}

export default FormSubmitPage;