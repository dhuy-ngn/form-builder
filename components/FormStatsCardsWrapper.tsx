import { GetFormStats } from "@/actions/FormActions";
import { currentUser } from "@clerk/nextjs";
import FormStatsCards from "./FormStatsCards";

async function FormFormStatsCardsWrapper() {
  const data = await GetFormStats();
  const user = currentUser();
  return (
    <FormStatsCards loading={false} data={data} />
  );
}

export default FormFormStatsCardsWrapper;