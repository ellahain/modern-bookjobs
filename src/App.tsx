import { ThemeProvider } from "./components/ui/theme-provider";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="job-postings-theme">
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold">Job Postings Manager</h1>
          </div>
        </header>
        <main>
          <Dashboard />
        </main>
        <footer className="border-t mt-12">
          <div className="container mx-auto py-6 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Job Postings Manager. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
