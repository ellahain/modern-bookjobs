export interface JobPosting {
  id: string;
  title: string;
  company: string;
  publisher: string;
  location: string;
  description: string;
  requirements: string;
  applicationUrl: string;
  postedDate: string;
  isActive: boolean;
}

export interface Publisher {
  id: string;
  name: string;
  website: string;
  logo?: string;
}
