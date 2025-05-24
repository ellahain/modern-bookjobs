import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { db } from "../lib/firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { JobPosting } from "../types";

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob?: JobPosting;
  onSaveComplete: () => void;
}


export function JobPostingForm({ isOpen, onClose, editingJob, onSaveComplete }: JobPostingFormProps) {
  const [formData, setFormData] = useState<Omit<JobPosting, 'id'>>({
    title: editingJob?.title || "",
    company: editingJob?.company || "",
    publisher: editingJob?.publisher || "",
    location: editingJob?.location || "",
    description: editingJob?.description || "",
    requirements: editingJob?.requirements || "",
    applicationUrl: editingJob?.applicationUrl || "",
    postedDate: editingJob?.postedDate || new Date().toISOString().split('T')[0],
    isActive: editingJob?.isActive ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingJob?.id) {
        const jobRef = doc(db, "jobs", editingJob.id);
        await updateDoc(jobRef, formData);
        console.log("Job updated in Firestore.");
      } else {
        await addDoc(collection(db, "jobs"), formData);
        console.log("Job added to Firestore.");
      }
      onSaveComplete();
      onClose();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingJob ? "Edit Job" : "Add Job"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />
          <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
          <Input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" />
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <Textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" />
          <Input name="applicationUrl" value={formData.applicationUrl} onChange={handleChange} placeholder="Application URL" />
          <Input name="postedDate" type="date" value={formData.postedDate} onChange={handleChange} />
          <div className="flex items-center gap-2">
            <Label htmlFor="isActive">Active</Label>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(value) => setFormData((prev) => ({ ...prev, isActive: value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {editingJob ? "Update Job" : "Post Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
