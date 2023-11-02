import CreateFormButton from "@/components/CreateFormButton";
import FormCards from "@/components/FormCards";
import StatsCards from "@/components/StatsCards";
import StatsCardWrapper from "@/components/StatsCardsWrapper";
import { Suspense } from "react";

export default function Home() {

  return (
    <div
      className="container">
      <Suspense fallback={
        <StatsCards loading={true} />
      }>
        <StatsCardWrapper />
      </Suspense>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <FormCards />
      </div>
    </div>
  );
}
