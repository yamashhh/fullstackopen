import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { isAxiosError } from "axios";
import dayjs, { type Dayjs } from "dayjs";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import {
  EntryTypes,
  HealthCheckRating,
  type Diagnosis,
  type Patient,
} from "../types";
import HealthRatingBar from "./HealthRatingBar";

const AddEntryModal = ({
  diagnoses,
  open,
  setOpen,
  setPatient,
}: {
  diagnoses: Diagnosis[] | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
}): JSX.Element => {
  const { patientId } = useParams();
  const [type, setType] = useState<EntryTypes>(EntryTypes.Hospital);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isSickLeaveDateRequired = useMemo(() => {
    return !(startDate == null && endDate == null);
  }, [startDate, endDate]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (submitting) {
          return;
        }
        setOpen(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          component="form"
          id="add-new-entry-form"
          onSubmit={async (event) => {
            event.preventDefault();
            if (patientId === undefined) {
              return;
            }
            try {
              setSubmitting(true);
              const patient = await patientService.addEntry(patientId, {
                description,
                date: date?.format("YYYY-MM-DD") ?? "",
                specialist,
                diagnosisCodes,
                ...(type === EntryTypes.Hospital
                  ? {
                      discharge: {
                        date: dischargeDate?.format("YYYY-MM-DD") ?? "",
                        criteria,
                      },
                    }
                  : type === EntryTypes.OccupationalHealthcare
                  ? {
                      employerName,
                      ...(startDate != null &&
                        endDate != null && {
                          sickLeave: {
                            startDate: startDate.format("YYYY-MM-DD"),
                            endDate: endDate.format("YYYY-MM-DD"),
                          },
                        }),
                    }
                  : type === EntryTypes.HealthCheck
                  ? {
                      healthCheckRating,
                    }
                  : {}),
              });
              setPatient(patient);
              setOpen(false);
            } catch (error) {
              setError(
                isAxiosError(error) ? error.response?.data : String(error)
              );
              setSubmitting(false);
            }
          }}
        >
          {error.length > 0 && <Alert severity="error">{error}</Alert>}
          <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              row
              value={type}
              onChange={(event) => {
                setType((event.target as HTMLInputElement).value as EntryTypes);
              }}
            >
              {Object.entries(EntryTypes).map(([key, value]) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={key}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            required
            type="text"
            label="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <DatePicker
            // https://stackoverflow.com/a/76012370/13754177
            slotProps={{
              textField: {
                required: true,
              },
            }}
            label="Date"
            value={date}
            format="YYYY-MM-DD"
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
          <TextField
            required
            type="text"
            label="Specialist"
            value={specialist}
            onChange={(event) => {
              setSpecialist(event.target.value);
            }}
          />
          <FormControl>
            <InputLabel id="diagnosis-codes">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnosis-codes"
              multiple
              value={diagnosisCodes}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setDiagnosisCodes(
                  // On autofill we get a stringified value.
                  typeof value === "string" ? value.split(",") : value
                );
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {diagnoses?.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                  <ListItemText
                    primary={`${diagnosis.code} ${diagnosis.name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(() => {
            switch (type) {
              case EntryTypes.Hospital: {
                return (
                  <FormControl>
                    <Stack spacing={2}>
                      <FormLabel>Discharge</FormLabel>
                      <DatePicker
                        // https://stackoverflow.com/a/76012370/13754177
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                        label="Date"
                        value={dischargeDate}
                        format="YYYY-MM-DD"
                        onChange={(newValue) => {
                          setDischargeDate(newValue);
                        }}
                      />
                      <TextField
                        required
                        type="text"
                        label="Criteria"
                        value={criteria}
                        onChange={(event) => {
                          setCriteria(event.target.value);
                        }}
                      />
                    </Stack>
                  </FormControl>
                );
              }
              case EntryTypes.OccupationalHealthcare: {
                return (
                  <>
                    <TextField
                      required
                      type="text"
                      label="Employer name"
                      value={employerName}
                      onChange={(event) => {
                        setEmployerName(event.target.value);
                      }}
                    />
                    <FormControl>
                      <Stack spacing={2}>
                        <FormLabel>Sick leave</FormLabel>
                        <DatePicker
                          // https://stackoverflow.com/a/76012370/13754177
                          label="Start date"
                          value={startDate}
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                            textField: {
                              required: isSickLeaveDateRequired,
                            },
                          }}
                          format="YYYY-MM-DD"
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                        />
                        <DatePicker
                          label="End date"
                          value={endDate}
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                            textField: {
                              required: isSickLeaveDateRequired,
                            },
                          }}
                          format="YYYY-MM-DD"
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        />
                      </Stack>
                    </FormControl>
                  </>
                );
              }
              case EntryTypes.HealthCheck: {
                return (
                  <FormControl>
                    <Stack spacing={2}>
                      <FormLabel>Health check rating</FormLabel>
                      <HealthRatingBar
                        showText
                        healthCheckRating={healthCheckRating}
                        setHealthCheckRating={setHealthCheckRating}
                      />
                    </Stack>
                  </FormControl>
                );
              }
              default: {
                return null;
              }
            }
          })()}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" form="add-new-entry-form" disabled={submitting}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
