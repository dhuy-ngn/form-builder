import { GetFormStats } from "@/actions/GetFormStats";
import { currentUser } from "@clerk/nextjs";
import StatsCards from "./StatsCards";

async function StatsCardWrapper() {
  const data = await GetFormStats();
  const user = currentUser();
  return (
    <StatsCards loading={false} data={data} />
  );
}

export default StatsCardWrapper;