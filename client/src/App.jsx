import { Routes, Route } from 'react-router-dom';

// Placeholder page. Replace with the real pages as you build them:
//   "/"           -> HomePage
//   "/reviews/:id" -> ReviewDetailPage
//   "/history"    -> HistoryPage
function Placeholder() {
  return (
    <main>
      <h1>PR Guardian</h1>
      <p>Setup works. Start building the pages.</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}