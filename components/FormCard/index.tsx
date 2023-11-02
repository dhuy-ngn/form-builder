import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ArrowRight, FileEdit, Send, View } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

type FormCardProps = {
  data: Form;
};

function FormCard({ data }: FormCardProps) {
  const { name, published, createdAt, visits, submissions, description, id } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className='flex items-center gap-2 justify-between'>
          <span
            className='truncate font-bold'>
            {name}
          </span>
          {published
            ? <Badge>Published</Badge>
            : <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription>
          {
            formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })
          }
          {
            published && (
              <span className="fles items-center-gap-2">
                <View className='text-muted-foreground' />
                <span className='text-muted-foreground'>{visits}</span>
                <Send className='text-muted-foreground' />
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