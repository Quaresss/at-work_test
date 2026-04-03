import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { EditUserPage } from './pages/EditUserPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<EditUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
