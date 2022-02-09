import { FC, ChangeEvent } from "react";
import { Button, Stack } from "@mui/material";

export type CommandBarProps = {
  isPlaying?: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onNext: () => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CommandBar: FC<CommandBarProps> = ({
  isPlaying,
  onStart,
  onStop,
  onReset,
  onUpload,
  onNext,
}) => {
  return (
    <Stack
      justifyContent="center"
      spacing={2}
      direction={{
        xs: "column",
        sm: "row",
      }}
    >
      <label htmlFor="contained-button-file">
        <input
          disabled={isPlaying}
          style={{ display: "none" }}
          accept=".txt"
          id="contained-button-file"
          type="file"
          onChange={onUpload}
        />
        <Button fullWidth disabled={isPlaying} variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Button variant="contained" onClick={isPlaying ? onStop : onStart}>
        {isPlaying ? "Stop" : "Start"}
      </Button>
      <Button variant="contained" disabled={isPlaying} onClick={onNext}>
        Next
      </Button>
      <Button disabled={isPlaying} variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
};

export default CommandBar;
