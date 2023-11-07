import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ArrowRight, Eye, FileEdit, Send } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../../components/ui/card';

type FormCardProps = {
  data: Form;
};

function FormCard({ data }: FormCardProps) {
  const { name, published, createdAt, visits, submissions, description, id } = data;

  return (
    <Card
      className='h-[200px]'>
      <CardHeader>
        <CardTitle
          className='flex items-center gap-2'>
          <span
            className='truncate font-bold'>
            {name}
          </span>
          {published
            ? <Badge>Published</Badge>
            : <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription
          className='flex flex-row justify-between'>
          {
            formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })
          }
          {
            published && (
              <span className="flex items-center gap-2 flex-row">
                <Eye className='text-muted-foreground h-4 w-4' />
                <span className='text-muted-foreground'>{visits}</span>
                <Send className='text-muted-foreground h-4 w-4' />
                <span className='text-muted-foreground'>{submissions}</span>
              </span>
            )}
        </CardDescription>
      </CardHeader>
      <CardContent
        className="h-[20px] truncate text-sm text-muted-foreground">
        {description || "No description"}
      </CardContent>
      <CardFooter>
        {
          published
            ? (
              <Button asChild
                className="w-full mt-2 text-md gap-4">
                <Link href={`/forms/${id}`}>
                  View submissions <ArrowRight className='text-xs' /></Link>
              </Button>
            )
            : (
              <Button asChild
                className="w-full mt-2 text-md gap-4">
                <Link href={`/forms/${id}/build`}>
                  Edit <FileEdit className='text-xs' /></Link>
              </Button>
            )}
      </CardFooter>
    </Card>
  );
}

export default FormCard;