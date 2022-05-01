import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      className="tgBtn"
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleAlignment}
    >
      <ToggleButton value="left">sdf</ToggleButton>
      <ToggleButton value="center"></ToggleButton>
      <ToggleButton value="right"></ToggleButton>
      <ToggleButton value="justify"></ToggleButton>
    </ToggleButtonGroup>
  );
}
