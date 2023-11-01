import { GetFormStats } from "@/actions/GetFormStats";
import StatsCard from "../StatsCard";
import { components } from "./components";

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
};

function StatsCards({
  data,
  loading,
}: StatsCardsProps) {
  return (
    <div
      className="flex flex-row gap-6 mx-4 flex-wrap">
      {
        components.map(component =>
          <StatsCard
            {...component}
            value={data?.[component.valueKey]}
            loading={loading} />)
      }
    </div>
  );
}

export default StatsCards;