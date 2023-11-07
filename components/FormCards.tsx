import { GetForms } from "@/actions/FormActions";
import FormCard from "./FormCard";

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {
        forms.map(form => (
          <FormCard
            key={form.id}
            data={form} />
        ))
      }
    </>
  );
}

export default FormCards;