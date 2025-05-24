import { useEffect, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  // Placeholder for simulating loaded job data (to be replaced by API in real use)
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No job listings available.</p>
      ) : (
        <ul className="grid gap-4">
          {jobs.map((job, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="italic text-sm text-gray-600">{job.department} — {job.company}, {job.location}</p>
              <p className="mt-2">{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
