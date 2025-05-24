import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobCollection);
      const jobList = jobSnapshot.docs.map(doc => doc.data());
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  return (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4 text-center">Job Listings</h1>
    {jobs.length === 0 ? (
      <p className="text-center text-gray-500">No job listings available.</p>
    ) : (
      <ul className="grid gap-4">
        {jobs.map((job, index) => (
          <li key={index} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="italic text-sm text-gray-600">
              {job.department} — {job.company}, {job.location}
            </p>
            <p className="mt-2">{job.description}</p>
            {job.applicationUrl && (
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                Apply Now
              </a>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

