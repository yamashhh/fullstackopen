import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import diagnosisService from "../services/diagnoses";
import patientService from "../services/patients";
import { type Diagnosis, type Patient } from "../types";
import EntryDetails from "./EntryDetails";

const PatientInfoPage = (): JSX.Element => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>();

  const fetchPatient = useCallback(async () => {
    if (patientId === undefined) {
      return;
    }
    const patient = await patientService.getPatient(patientId);
    setPatient(patient);
  }, [patientId]);
  const fetchDiagnoses = async (): Promise<void> => {
    const diagnoses = await diagnosisService.getAll();
    setDiagnoses(diagnoses);
  };
  const fetchData = useCallback(async () => {
    await Promise.all([fetchPatient(), fetchDiagnoses()]);
  }, [fetchPatient]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <Container
      sx={{
        paddingBlock: 4,
      }}
    >
      <Typography variant="h4">{patient?.name}</Typography>
      <TableContainer sx={{ marginBottom: 4 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>occupation</TableCell>
              <TableCell>{patient?.occupation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>gender</TableCell>
              <TableCell>{patient?.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>social security number</TableCell>
              <TableCell>{patient?.ssn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>date of birth</TableCell>
              <TableCell>{patient?.dateOfBirth}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" mb={2}>
        entries
      </Typography>
      <Stack spacing={4}>
        {patient?.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Stack>
    </Container>
  );
};

export default PatientInfoPage;
