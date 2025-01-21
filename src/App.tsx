import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { CollegePredictor } from './pages/CollegePredictor';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages';
import { RD } from './pages/RD';
import { Schedule } from './pages/Schedule';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/predictor" element={<CollegePredictor />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/rd" element={<RD />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;