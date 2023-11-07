import CreateFormButton from "@/components/CreateFormButton";
import FormStatsCardWrapper from "@/components/FormStatsCardsWrapper";
import { Suspense } from "react";
import FormCards from "../../components/FormCards";
import FormStatsCards from "../../components/FormStatsCards";

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
