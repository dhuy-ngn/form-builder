import { GetFormById } from "@/actions/FormActions";
import StatsCards from "@/components/StatsCards";
import StatsCardsWrapper from "@/components/StatsCardsWrapper";
import SubmissionTable from "@/components/SubmissionTable";
import VisitFormButton from "@/components/VisitFormButton";
import { Suspense } from "react";

type FormBuilderProps = {
  params: {
    formId: string;
  };
};

async function FormDetailPage({
  params: {
    formId
  }
}: FormBuilderProps) {
  const form = await GetFormById(Number(formId));
  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions, name, shareUrl } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits);
  }
  const bounceRate = 1 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-xl font-bold truncate">{name}</h1>
          <VisitFormButton shareUrl={shareUrl} />
        </div>
      </div>

      <div className="container">
        <Suspense fallback={
          <StatsCards loading={true} />
        }>
          <StatsCardsWrapper />
          <SubmissionTable id={Number(formId)} />
        </Suspense>
      </div>
    </>
  );
}

export default FormDetailPage;