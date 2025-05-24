import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Publisher } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface PublisherFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveComplete: () => void;
}

export function PublisherForm({ isOpen, onClose, onSaveComplete }: PublisherFormProps) {
  const [formData, setFormData] = useState({ name: "", website: "" });
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const fetchPublishers = async () => {
    const snap = await getDocs(collection(db, "publishers"));
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Publisher));
    setPublishers(list);
  };

  useEffect(() => {
    if (isOpen) fetchPublishers();
  }, [isOpen]);

  const handleAdd = async () => {
    if (!formData.name.trim()) return;
    await addDoc(collection(db, "publishers"), formData);
    setFormData({ name: "", website: "" });
    fetchPublishers();
    onSaveComplete();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "publishers", id));
    fetchPublishers();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Publishers</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Publisher Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Publisher Website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          />
          <Button onClick={handleAdd}>Add Publisher</Button>
        </div>
        <ul className="mt-4 space-y-1">
          {publishers.map(p => (
            <li key={p.id} className="flex justify-between border-b py-1">
              <span>{p.name}</span>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
