import FormStatsCards from "@/app/(dashboard)/_components/FormStatsCards";
import CreateFormButton from "@/app/forms/[formId]/build/_components/CreateFormButton";
import FormCards from "@/app/forms/[formId]/build/_components/FormCards";
import FormStatsCardWrapper from "@/components/FormFormStatsCardsWrapper/FormFormFormStatsCardsWrapper";
import { Suspense } from "react";

export default function Home() {

  return (
    <div
      className="container">
      <Suspense fallback={
        <FormStatsCards loading={true} />
      }>
        <FormStatsCardWrapper />
      </Suspense>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <FormCards />
      </div>
    </div>
  );
}
