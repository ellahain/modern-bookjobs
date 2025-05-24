import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { JobPosting } from "../types";
import { useJobPostingsStore } from "../lib/store";

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob?: JobPosting;
}

export function JobPostingForm({ isOpen, onClose, editingJob }: JobPostingFormProps) {
  const { publishers, addJobPosting, updateJobPosting } = useJobPostingsStore();
  
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

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handlePublisherChange = (value: string) => {
    setFormData((prev) => ({ ...prev, publisher: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJob) {
      updateJobPosting(editingJob.id, formData);
    } else {
      addJobPosting(formData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingJob ? "Edit Job Posting" : "Add New Job Posting"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              {publishers.length > 0 ? (
                <Select
                  value={formData.publisher}
                  onValueChange={handlePublisherChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a publisher" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishers.map((pub) => (
                      <SelectItem key={pub.id} value={pub.name}>
                        {pub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applicationUrl">Application URL</Label>
              <Input
                id="applicationUrl"
                name="applicationUrl"
                type="url"
                value={formData.applicationUrl}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postedDate">Posted Date</Label>
              <Input
                id="postedDate"
                name="postedDate"
                type="date"
                value={formData.postedDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isActive">Active Listing</Label>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingJob ? "Update" : "Add"} Job Posting
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
