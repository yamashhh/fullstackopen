import PatientListPage from "@/components/PatientListPage";
import { apiBaseUrl } from "@/constants";
import patientService from "@/services/patients";
import { type Patient } from "@/types";
import { Button, Container, Divider, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PatientInfoPage from "./components/PatientInfoPage";

const App = (): JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const fetchPatientList = useCallback(async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  }, []);

  useEffect(() => {
    void Promise.all([axios.get(`${apiBaseUrl}/ping`), fetchPatientList()]);
  }, [fetchPatientList]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:patientId" element={<PatientInfoPage />} />
          </Routes>
        </Container>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
