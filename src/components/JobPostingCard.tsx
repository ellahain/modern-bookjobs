import { Trash2, Pencil } from "lucide-react";
import { JobPosting } from "../types";
import { Button } from "./ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface JobPostingCardProps {
  job: JobPosting;
  onEdit: () => void;
  onRefresh: () => void;
}

export function JobPostingCard({ job, onEdit, onRefresh }: JobPostingCardProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "jobs", job.id));
        console.log("Deleted from Firestore");
        onRefresh();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md space-y-2">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
      <p className="text-sm">{job.description}</p>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
