import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const Time = styled("p")(() => ({
    fontWeight: "bold",
}));

interface TimeWrapperProps {
    started: boolean;
}

export const TimeWrapper = styled(Paper)<TimeWrapperProps>(({started}:TimeWrapperProps) => ({
    borderRadius: "10px",
    background: started ? green[800] : red[800],
    color: "white"
}));