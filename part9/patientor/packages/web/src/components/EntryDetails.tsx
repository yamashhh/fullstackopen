import {
  LocalHospital as LocalHospitalIcon,
  MonitorHeart as MonitorHeartIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { Container, Divider, List, ListItem, Typography } from "@mui/material";
import { EntryTypes, type Diagnosis, type Entry } from "../types";
import HealthRatingBar from "./HealthRatingBar";

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses?: Diagnosis[];
}): JSX.Element | null => {
  switch (entry.type) {
    case EntryTypes.Hospital: {
      return (
        <Container component="article">
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
          >
            <LocalHospitalIcon /> {entry.date}
          </Typography>
          <Typography variant="body1">{entry.description}</Typography>
          <List>
            {entry.diagnosisCodes?.map((diagnosis) => (
              <ListItem key={diagnosis}>
                {diagnosis}{" "}
                {diagnoses?.find((element) => element.code === diagnosis)?.name}
              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginBlock: 2 }} />
          <footer>
            <Typography variant="body2">
              diagnosed by {entry.specialist}
            </Typography>
          </footer>
        </Container>
      );
    }
    case EntryTypes.OccupationalHealthcare: {
      return (
        <Container component="article">
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
          >
            <WorkIcon /> {entry.date} / {entry.employerName}
          </Typography>
          <Typography variant="body1">{entry.description}</Typography>
          <List>
            {entry.diagnosisCodes?.map((diagnosis) => (
              <ListItem key={diagnosis}>
                {diagnosis}{" "}
                {diagnoses?.find((element) => element.code === diagnosis)?.name}
              </ListItem>
            ))}
          </List>
          {entry.sickLeave != null && (
            <>
              <Typography variant="h6">Sick leave</Typography>
              <Typography variant="body2">
                start date: {entry.sickLeave.startDate}
                <br />
                end date: {entry.sickLeave.endDate}
              </Typography>
            </>
          )}
          <Divider sx={{ marginBlock: 2 }} />
          <footer>
            <Typography variant="body2">
              diagnosed by {entry.specialist}
            </Typography>
          </footer>
        </Container>
      );
    }
    case EntryTypes.HealthCheck: {
      return (
        <Container component="article">
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
          >
            <MonitorHeartIcon /> {entry.date}
          </Typography>
          <Typography variant="body1">{entry.description}</Typography>
          <List>
            {entry.diagnosisCodes?.map((diagnosis) => (
              <ListItem key={diagnosis}>
                {diagnosis}{" "}
                {diagnoses?.find((element) => element.code === diagnosis)?.name}
              </ListItem>
            ))}
          </List>
          <HealthRatingBar
            healthCheckRating={entry.healthCheckRating}
            showText
          />
          <Divider sx={{ marginBlock: 2 }} />
          <footer>
            <Typography variant="body2">
              diagnosed by {entry.specialist}
            </Typography>
          </footer>
        </Container>
      );
    }
    default: {
      return null;
    }
  }
};

export default EntryDetails;
