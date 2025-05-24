import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

  const fetchJobs = async () => {
    const jobCollection = collection(db, 'jobs');
    const jobSnapshot = await getDocs(jobCollection);
    const jobList = jobSnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const saveJob = async () => {
  if (!jobForm.title || !jobForm.company || !jobForm.location) return;

  try {
    console.log("Submitting job:", jobForm);

    if (editingIndex !== null) {
      const jobRef = doc(db, 'jobs', jobs[editingIndex].id);
      await updateDoc(jobRef, jobForm);
      setEditingIndex(null);
      console.log("Job updated.");
    } else {
      const docRef = await addDoc(collection(db, 'jobs'), jobForm);
      console.log("Job added with ID:", docRef.id);
    }

    setJobForm({ title: '', company: '', location: '', department: '', description: '' });
    fetchJobs();
  } catch (error) {
    console.error("Error saving job:", error);
  }
};


  const deleteJob = async (index) => {
    const jobRef = doc(db, 'jobs', jobs[index].id);
    await deleteDoc(jobRef);
    fetchJobs();
  };

  const editJob = (index) => {
    setEditingIndex(index);
    setJobForm({
      title: jobs[index].title,
      company: jobs[index].company,
      location: jobs[index].location,
      department: jobs[index].department,
      description: jobs[index].description
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <input name="title" placeholder="Job Title" value={jobForm.title} onChange={handleChange} className="border p-2 rounded" />
        <input name="company" placeholder="Company" value={jobForm.company} onChange={handleChange} className="border p-2 rounded" />
        <input name="location" placeholder="Location" value={jobForm.location} onChange={handleChange} className="border p-2 rounded" />
        <input name="department" placeholder="Department" value={jobForm.department} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="description" placeholder="Job Description" value={jobForm.description} onChange={handleChange} className="border p-2 rounded col-span-full" />
        <button onClick={saveJob} className="bg-blue-500 text-white px-4 py-2 rounded col-span-full">
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
