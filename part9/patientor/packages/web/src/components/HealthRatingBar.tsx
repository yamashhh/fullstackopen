import {
  Favorite,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { Rating, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type Dispatch, type SetStateAction } from "react";
import { type HealthCheckRating } from "../types";

interface BarProps {
  healthCheckRating: number;
  showText?: boolean;
  setHealthCheckRating?: Dispatch<SetStateAction<HealthCheckRating>>;
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({
  healthCheckRating,
  setHealthCheckRating,
  showText = false,
}: BarProps): JSX.Element => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly={setHealthCheckRating == null}
        value={4 - healthCheckRating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(_, newValue) => {
          newValue != null && setHealthCheckRating?.(4 - newValue);
        }}
      />
      {showText ? (
        <Typography>{HEALTHBAR_TEXTS[healthCheckRating]}</Typography>
      ) : null}
    </div>
  );
};

export default HealthRatingBar;
