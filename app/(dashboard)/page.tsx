import StatsCardWrapper from "@/components/StatsCardWrapper";
import StatsCards from "@/components/StatsCardWrapper/StatsCards";
import { Suspense } from "react";

export default function Home() {

  return (
    <div>
      <Suspense fallback={
        <StatsCards loading={true} />
      }>
        <StatsCardWrapper />
      </Suspense>
    </div>
  );
}
