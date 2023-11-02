import { GetFormStats } from "@/actions/FormActions";
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
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 mt-4">
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