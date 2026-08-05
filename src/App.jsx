import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import LocationSensorsPage from "./pages/LocationSensorsPage";
import SensorMeasurementsPage from "./pages/SensorMeasurementsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="locations/:locationId" element={<LocationSensorsPage />} />
          <Route path="sensors/:sensorId" element={<SensorMeasurementsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
