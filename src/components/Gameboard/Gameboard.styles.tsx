import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const Score = styled("p")(() => ({
    fontWeight: "bold",
}))

export const WordsContainer = styled("p")(() => ({
    margin: "50px",
}));

export const IntervalSelectContainer = styled(Box)(() => ({
    display: "flex",
    gap: "10px",
    alignContent: "center",
    justifyContent: "center"

}));

interface IntervalOptionProps {
    selected: boolean
}

export const IntervalOption = styled(Button)<IntervalOptionProps>(({selected}:IntervalOptionProps) => ({
    border: "solid white",
    borderRadius: "20px",
    height: "40px",
    color: !selected ? "white" : "#242424",
    background: !selected ? "transparent" : "white",
}));
