import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { JobPosting, Publisher } from '../types';

interface JobPostingsState {
  jobPostings: JobPosting[];
  publishers: Publisher[];
  addJobPosting: (jobPosting: Omit<JobPosting, 'id'>) => void;
  updateJobPosting: (id: string, jobPosting: Partial<JobPosting>) => void;
  deleteJobPosting: (id: string) => void;
  addPublisher: (publisher: Omit<Publisher, 'id'>) => void;
  updatePublisher: (id: string, publisher: Partial<Publisher>) => void;
  deletePublisher: (id: string) => void;
}

export const useJobPostingsStore = create<JobPostingsState>()(
  persist(
    (set) => ({
      jobPostings: [],
      publishers: [],
      
      addJobPosting: (jobPosting) => 
        set((state) => ({
          jobPostings: [...state.jobPostings, { ...jobPosting, id: uuidv4() }]
        })),
      
      updateJobPosting: (id, updatedJobPosting) =>
        set((state) => ({
          jobPostings: state.jobPostings.map((posting) => 
            posting.id === id ? { ...posting, ...updatedJobPosting } : posting
          )
        })),
      
      deleteJobPosting: (id) =>
        set((state) => ({
          jobPostings: state.jobPostings.filter((posting) => posting.id !== id)
        })),
      
      addPublisher: (publisher) =>
        set((state) => ({
          publishers: [...state.publishers, { ...publisher, id: uuidv4() }]
        })),
      
      updatePublisher: (id, updatedPublisher) =>
        set((state) => ({
          publishers: state.publishers.map((publisher) =>
            publisher.id === id ? { ...publisher, ...updatedPublisher } : publisher
          )
        })),
      
      deletePublisher: (id) =>
        set((state) => ({
          publishers: state.publishers.filter((publisher) => publisher.id !== id)
        }))
    }),
    {
      name: 'job-postings-storage',
    }
  )
);
