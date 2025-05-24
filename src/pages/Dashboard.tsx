import { useState } from 'react';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    department: '',
    description: ''
  });

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const addOrUpdateJob = () => {
    if (!jobForm.title || !jobForm.company || !jobForm.location) return;
    if (editingIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = jobForm;
      setJobs(updatedJobs);
      setEditingIndex(null);
    } else {
      setJobs([...jobs, jobForm]);
    }
    setJobForm({ title: '', company: '', location: '', department: '', description: '' });
  };

  const deleteJob = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs.splice(index, 1);
    setJobs(updatedJobs);
  };

  const editJob = (index) => {
    setEditingIndex(index);
    setJobForm(jobs[index]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobForm.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={jobForm.company}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobForm.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={jobForm.department}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobForm.description}
          onChange={handleChange}
          className="border p-2 rounded col-span-full"
        />
        <button
          onClick={addOrUpdateJob}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-full"
        >
          {editingIndex !== null ? 'Update Job' : 'Add Job'}
        </button>
      </div>

      <ul>
        {jobs.map((job, index) => (
          <li key={index} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="italic text-sm text-gray-600">{job.department} — {job.company}, {job.location}</p>
            <p className="mt-2">{job.description}</p>
            <div className="mt-3 space-x-3">
              <button onClick={() => editJob(index)} className="text-blue-600">Edit</button>
              <button onClick={() => deleteJob(index)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
