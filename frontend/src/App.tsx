import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';
import { LandingPage } from './pages/landing-page';
import { LoginPage } from './pages/login-page';
import { AppLayout } from './pages/app-layout';
import { DashboardPage } from './pages/dashboard-page';
import { SchoolsPage } from './pages/schools-page';
import { ClassesPage } from './pages/classes-page';
import { BooksPage } from './pages/books-page';
import { ActivitiesPage } from './pages/activities-page';
import { EvaluationPage } from './pages/evaluation-page';
import { ResultsPage } from './pages/results-page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="schools" element={<SchoolsPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="evaluation" element={<EvaluationPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
