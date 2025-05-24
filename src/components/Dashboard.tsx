import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { JobPostingCard } from "./JobPostingCard";
import { JobPostingForm } from "./JobPostingForm";
import { PublisherForm } from "./PublisherForm";
import { useJobPostingsStore } from "../lib/store";
import { JobPosting, Publisher } from "../types";

export function Dashboard() {
  const { jobPostings, publishers, deleteJobPosting, deletePublisher } = useJobPostingsStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isPublisherFormOpen, setIsPublisherFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | undefined>(undefined);
  const [editingPublisher, setEditingPublisher] = useState<Publisher | undefined>(undefined);
  
  const filteredJobs = jobPostings.filter((job) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditJob = (id: string) => {
    const job = jobPostings.find((job) => job.id === id);
    if (job) {
      setEditingJob(job);
      setIsJobFormOpen(true);
    }
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      deleteJobPosting(id);
    }
  };

  const handleEditPublisher = (id: string) => {
    const publisher = publishers.find((pub) => pub.id === id);
    if (publisher) {
      setEditingPublisher(publisher);
      setIsPublisherFormOpen(true);
    }
  };

  const handleDeletePublisher = (id: string) => {
    if (confirm("Are you sure you want to delete this publisher?")) {
      deletePublisher(id);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Job Postings Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => {
            setEditingJob(undefined);
            setIsJobFormOpen(true);
          }}>
            Add Job Posting
          </Button>
          <Button variant="outline" onClick={() => {
            setEditingPublisher(undefined);
            setIsPublisherFormOpen(true);
          }}>
            Add Publisher
          </Button>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="publishers">Publishers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search job postings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="ghost" onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          </div>
          
          {filteredJobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No job postings found.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setEditingJob(undefined);
                  setIsJobFormOpen(true);
                }}
              >
                Add your first job posting
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <JobPostingCard
                  key={job.id}
                  jobPosting={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="publishers" className="space-y-4">
          {publishers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No publishers found.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setEditingPublisher(undefined);
                  setIsPublisherFormOpen(true);
                }}
              >
                Add your first publisher
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishers.map((publisher) => (
                <div key={publisher.id} className="border rounded-lg p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{publisher.name}</h3>
                      <a 
                        href={publisher.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {publisher.website}
                      </a>
                    </div>
                    {publisher.logo && (
                      <img 
                        src={publisher.logo} 
                        alt={`${publisher.name} logo`} 
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPublisher(publisher.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeletePublisher(publisher.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {isJobFormOpen && (
        <JobPostingForm
          isOpen={isJobFormOpen}
          onClose={() => {
            setIsJobFormOpen(false);
            setEditingJob(undefined);
          }}
          editingJob={editingJob}
        />
      )}

      {isPublisherFormOpen && (
        <PublisherForm
          isOpen={isPublisherFormOpen}
          onClose={() => {
            setIsPublisherFormOpen(false);
            setEditingPublisher(undefined);
          }}
          editingPublisher={editingPublisher}
        />
      )}
    </div>
  );
}
