import { useEffect, useState } from "react";
import { JobPosting } from "../types";
import { JobPostingForm } from "../components/JobPostingForm";
import { JobPostingCard } from "../components/JobPostingCard";
import { PublisherForm } from "../components/PublisherForm";
import { Button } from "../components/ui/button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Dashboard() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | undefined>(undefined);
  const [isPublisherModalOpen, setIsPublisherModalOpen] = useState(false);

  const fetchJobs = async () => {
    const jobCollection = collection(db, "jobs");
    const jobSnapshot = await getDocs(jobCollection);
    const jobList = jobSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as JobPosting[];
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = () => {
    setEditingJob(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsPublisherModalOpen(true)}>Manage Publishers</Button>
          <Button onClick={handleAdd}>+ Add Job</Button>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobPostingCard
            key={job.id}
            job={job}
            onEdit={() => handleEdit(job)}
            onRefresh={fetchJobs}
          />
        ))}
      </div>

      <JobPostingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingJob={editingJob}
        onSaveComplete={fetchJobs}
      />

      <PublisherForm
        isOpen={isPublisherModalOpen}
        onClose={() => setIsPublisherModalOpen(false)}
        onSaveComplete={fetchJobs}
      />
    </div>
  );
}
