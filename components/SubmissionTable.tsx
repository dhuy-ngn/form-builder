import { GetFormSubmissions } from "@/actions/FormActions";
import { ElementTypes, FormElementInstance } from "@/types/FormElement";
import { format } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type Row = { [key: string]: string; } & {
  submittedAt: Date;
};

async function SubmissionTable({ id }: { id: number; }) {
  const form = await GetFormSubmissions(id);

  if (!form) {
    throw new Error("Form not found!");
  }
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string,
    label: string,
    required: boolean,
    type: ElementTypes;
  }[] = [];
  const rows: Row[] = [];
  form.FormSubmissions.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt
    });
  });

  formElements.forEach(element => {
    switch (element.type) {
      case "TextField":
      case "TextareaField":
      case "SelectField":
      case "MultiselectField":
      case "DateField":
      case "CheckboxField":
      case "NumberField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type
        });
        break;
      default:
        break;
    }
  });

  return (
    <>
      <h1 className="text-xl font-bold my-4">
        Submissions
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(column => (
                  <TableHead key={column.id} className="uppercase">
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="text-muted-foreground text-right uppercase">
                  Submitted at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                rows.map((row, index) => (
                  <TableRow key={index}>
                    {
                      columns.map(column => (
                        <RowCell
                          key={column.id}
                          type={column.type}
                          value={row[column.id]} />
                      ))
                    }
                    <TableCell className="text-muted-foreground text-right">
                      {
                        formatDistance(row.submittedAt, new Date(), {
                          addSuffix: true
                        })
                      }
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </h1>
    </>
  );
}

function RowCell({ type, value }: { type: ElementTypes, value: string; }) {
  let node: ReactNode = <></>;
  switch (type) {
    case "MultiselectField":
      const stringifiedValue = JSON.parse(value)
        .toString()
        .replaceAll(",", ", ");
      if (stringifiedValue)
        node = stringifiedValue;
      else
        node = <span className="text-muted-foreground font-normal">
          (no selection)
        </span>;
      break;
    case "CheckboxField":
      node = <Checkbox checked={value === "true"} disabled />;
      break;
    case "DateField":
      node = <Badge variant={"outline"}>
        {format(new Date(value), "dd/MM/yyyy")}
      </Badge>;
      break;
    default:
      node = value;
      break;
  }
  return <TableCell>{node}</TableCell>;
}

export default SubmissionTable;