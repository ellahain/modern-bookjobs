import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Publisher } from "../types";
import { useJobPostingsStore } from "../lib/store";

interface PublisherFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingPublisher?: Publisher;
}

export function PublisherForm({ isOpen, onClose, editingPublisher }: PublisherFormProps) {
  const { addPublisher, updatePublisher } = useJobPostingsStore();
  
  const [formData, setFormData] = useState<Omit<Publisher, 'id'>>({
    name: editingPublisher?.name || "",
    website: editingPublisher?.website || "",
    logo: editingPublisher?.logo || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPublisher) {
      updatePublisher(editingPublisher.id, formData);
    } else {
      addPublisher(formData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingPublisher ? "Edit Publisher" : "Add New Publisher"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Publisher Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (optional)</Label>
            <Input
              id="logo"
              name="logo"
              type="url"
              value={formData.logo || ""}
              onChange={handleChange}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPublisher ? "Update" : "Add"} Publisher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
