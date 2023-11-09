import { GetFormStats } from "@/actions/FormActions";
import { currentUser } from "@clerk/nextjs";
import StatsCards from "./StatsCards";

async function StatsCardsWrapper() {
  const data = await GetFormStats();
  const user = currentUser();
  return (
    <StatsCards loading={false} data={data} />
  );
}

export default StatsCardsWrapper;