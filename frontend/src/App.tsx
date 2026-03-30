import { CalendarPage } from "./pages/CalendarPage";
import { ClientPage } from "./pages/ClientPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManageClientPage } from "./pages/ManageClientPage";
import { PageHeader } from "./components/PageHeader";
import { fetchClients, fetchEvents } from "./api/reservations";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: clientsData } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: allEvents } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <BrowserRouter>
      <PageHeader />

      <Routes>
        <Route
          path="/"
          element={
            <CalendarPage allClients={clientsData} allEvents={allEvents} />
          }
        />
        <Route
          path="/clients"
          element={<ClientPage allClients={clientsData} />}
        />
        <Route
          path="/manage-client/:id"
          element={<ManageClientPage allClients={clientsData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
