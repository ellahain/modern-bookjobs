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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = filters.department ? job.department === filters.department : true;
    const matchesPublisher = filters.publisher ? job.publisher === filters.publisher : true;
    const matchesType = filters.jobType ? job.jobType === filters.jobType : true;
    const matchesRemote = filters.remoteOnly ? job.remoteAllowed : true;
    return matchesDepartment && matchesPublisher && matchesType && matchesRemote;
  });

  const grouped = filteredJobs.reduce((acc, job) => {
    acc[job.publisher] = acc[job.publisher] || [];
    acc[job.publisher].push(job);
    return acc;
  }, {} as Record<string, JobPosting[]>);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Job Listings</h1>

      {/* Filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded bg-gray-50">
        <Input placeholder="Department" name="department" value={filters.department} onChange={handleFilterChange} />
        <Input placeholder="Publisher" name="publisher" value={filters.publisher} onChange={handleFilterChange} />
        <select name="jobType" value={filters.jobType} onChange={handleFilterChange} className="border rounded p-2">
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remoteOnly"
            checked={filters.remoteOnly}
            onChange={handleFilterChange}
          />
          Remote only
        </label>
      </div>

      {/* Job listings */}
      {Object.entries(grouped).map(([publisher, postings]) => (
        <div key={publisher}>
          <h2 className="text-xl font-semibold mt-6 mb-3">{publisher}</h2>
          <ul className="space-y-4">
            {postings.map((job) => (
              <li key={job.id} className="border p-4 rounded shadow bg-white">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm italic">{job.department} — {job.company}</p>
                <p className="text-sm text-gray-600">{job.location} • {job.jobType}{job.remoteAllowed ? " • Remote OK" : ""}</p>
                <p className="mt-2">{job.description}</p>
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 underline"
                >
                  Apply Now
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
