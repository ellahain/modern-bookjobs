import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { JobPosting } from "../types";
import { Input } from "../components/ui/input";

export default function Home() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filters, setFilters] = useState({
    department: "",
    publisher: "",
    jobType: "",
    remoteOnly: false,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const snap = await getDocs(collection(db, "jobs"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobPosting));
      setJobs(list);
    };
    fetchJobs();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredJobs = jobs.filter(job =>
    (filters.department === "" || job.department === filters.department) &&
    (filters.publisher === "" || job.publisher === filters.publisher) &&
    (filters.jobType === "" || job.jobType === filters.jobType) &&
    (!filters.remoteOnly || job.remote === true)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Department"
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
        />
        <Input
          placeholder="Publisher"
          name="publisher"
          value={filters.publisher}
          onChange={handleFilterChange}
        />
        <Input
          placeholder="Job Type"
          name="jobType"
          value={filters.jobType}
          onChange={handleFilterChange}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="remoteOnly"
            checked={filters.remoteOnly}
            onChange={handleFilterChange}
          />
          <span>Remote Only</span>
        </label>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs match your filters.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map(job => (
            <li key={job.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>Publisher: {job.publisher}</p>
              <p>Department: {job.department}</p>
              <p>Type: {job.jobType}</p>
              <p>{job.remote ? "Remote" : "On-site"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
