import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { type Patient } from "../types";

const PatientInfoPage = (): JSX.Element => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();

  const fetchPatient = useCallback(async () => {
    if (patientId === undefined) {
      return;
    }
    const patient = await patientService.getPatient(patientId);
    setPatient(patient);
  }, [patientId]);
  useEffect(() => {
    void fetchPatient();
  }, [fetchPatient]);

  return (
    <Container
      sx={{
        paddingBlock: 4,
      }}
    >
      <Typography variant="h4">{patient?.name}</Typography>
      <TableContainer>
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
    </Container>
  );
};

export default PatientInfoPage;
