import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type FormStatsCardProps = {
  title: string,
  description: string,
  valueKey: string,
  value?: number | "",
  loading: boolean,
  className?: string,
};

function FormStatsCard({
  title,
  description,
  valueKey,
  value,
  loading,
  className,
}: FormStatsCardProps) {

  return (
    <Card
      className={`${className} border-2 border-b-4 pr-4`}>
      <CardHeader
        className="flex flex-row items-center justify-between pb-2">
        <CardTitle
          className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className="font-bold text-3xl">
        {
          loading &&
          <Skeleton>
            <span
              className="opacity-0">
              0
            </span>
          </Skeleton>
        }
        {
          !loading && value &&
            valueKey.includes('Rate') ? `${value * 100}%` : value
        }
        <p className="text-xs text-muted-foreground pt-1 font-normal">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default FormStatsCard;