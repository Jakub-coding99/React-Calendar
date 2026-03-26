import { CalendarPage } from "./pages/CalendarPage";
import { ClientPage } from "./pages/ClientPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManageClientPage } from "./pages/ManageClientPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/manage-client/:id" element={<ManageClientPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
