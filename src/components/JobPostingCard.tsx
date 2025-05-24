import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { JobPosting } from "../types";
import { formatDistanceToNow } from "date-fns";

interface JobPostingCardProps {
  jobPosting: JobPosting;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JobPostingCard({ jobPosting, onEdit, onDelete }: JobPostingCardProps) {
  const {
    id,
    title,
    company,
    publisher,
    location,
    description,
    postedDate,
    isActive,
  } = jobPosting;

  const formattedDate = formatDistanceToNow(new Date(postedDate), { addSuffix: true });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base mt-1">{company} • {location}</CardDescription>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Publisher: {publisher}</p>
            <p className="text-sm text-muted-foreground">Posted: {formattedDate}</p>
          </div>
          <p className="text-sm line-clamp-3">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
