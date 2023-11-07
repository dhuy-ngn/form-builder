import { GetFormStats } from "@/actions/FormActions";
import FormStatsCard from "../FormStatsCard";
import { components } from "./components";

type FormStatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
};

function FormStatsCards({
  data,
  loading,
}: FormStatsCardsProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 mt-4">
      {
        components.map((component, index) =>
          <FormStatsCard
            key={index}
            {...component}
            value={data?.[component.valueKey]}
            loading={loading} />)
      }
    </div>
  );
}

export default FormStatsCards;