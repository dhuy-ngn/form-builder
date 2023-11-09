import { GetFormById } from "@/actions/FormActions";
import FormBuilder from "@/components/FormBuilder";

type FormBuilderProps = {
  params: {
    formId: string;
  };
};

async function FormBuilderPage({
  params: {
    formId
  }
}: FormBuilderProps) {
  const form = await GetFormById(Number(formId));
  if (!form) {
    throw new Error("Form not found");
  }
  return (
    <FormBuilder form={form} />
  );
}

export default FormBuilderPage;