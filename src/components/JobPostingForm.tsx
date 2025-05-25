// trigger deploy

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { db } from "../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { JobPosting, Publisher } from "../types";

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob?: JobPosting;
  onSaveComplete: () => void;
}

export function JobPostingForm({
  isOpen,
  onClose,
  editingJob,
  onSaveComplete,
}: JobPostingFormProps) {
  const [formData, setFormData] = useState<Omit<JobPosting, "id">>({
    title: "",
    company: "",
    publisher: "",
    location: "",
    department: "",
    jobType: "Full-time",
    remoteAllowed: false,
    description: "",
    requirements: "",
    applicationUrl: "",
    postedDate: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      const snap = await getDocs(collection(db, "publishers"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Publisher));
      setPublishers(list);
    };
    fetchPublishers();
  }, []);

  useEffect(() => {
    if (editingJob) {
      const { id, ...rest } = editingJob;
      setFormData(rest);
    } else {
      setFormData({
        title: "",
        company: "",
        publisher: "",
        location: "",
        department: "",
        jobType: "Full-time",
        remoteAllowed: false,
        description: "",
        requirements: "",
        applicationUrl: "",
        postedDate: new Date().toISOString().split("T")[0],
        isActive: true,
      });
    }
  }, [editingJob]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingJob?.id) {
        await updateDoc(doc(db, "jobs", editingJob.id), formData);
      } else {
        await addDoc(collection(db, "jobs"), formData);
      }
      onSaveComplete();
      onClose();
    } catch (err) {
      console.error("Error submitting job:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingJob ? "Edit Job" : "Post New Job"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />
          <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
          <select name="publisher" value={formData.publisher} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Publisher</option>
            {publishers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          <select name="jobType" value={formData.jobType} onChange={handleChange} className="border p-2 rounded">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          <div className="flex items-center gap-2">
            <Label htmlFor="remoteAllowed">Remote</Label>
            <Switch
              id="remoteAllowed"
              checked={formData.remoteAllowed}
              onCheckedChange={(val) => setFormData(prev => ({ ...prev, remoteAllowed: val }))}
            />
          </div>
          <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" />
          <Textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" />
          <Input name="applicationUrl" value={formData.applicationUrl} onChange={handleChange} placeholder="Application URL" />
          <Input name="postedDate" type="date" value={formData.postedDate} onChange={handleChange} />
          <div className="flex items-center gap-2">
            <Label htmlFor="isActive">Active</Label>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(val) => setFormData(prev => ({ ...prev, isActive: val }))}
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
