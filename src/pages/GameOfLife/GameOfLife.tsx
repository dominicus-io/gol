import { FC, useState, useEffect, useCallback } from "react";
import {
  Container,
  Backdrop,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { Grid, CommandBar, Suspense, Layout } from "../../components";
import { useGameOfLife, useLoadGameOfLifeFile } from "../../hooks";

import { defaultGOFGrid } from "./defaultGOFGrid";

const GameOfLife: FC = () => {
  const {
    handleChange,
    grid: uploadedGrid,
    loading,
    error: uploadingError,
  } = useLoadGameOfLifeFile();
  const [initialGrid, setInitialGrid] = useState(defaultGOFGrid);
  const handleUpload = useCallback(
    (e) => {
      handleChange(e);
      e.currentTarget.files = null;
      e.currentTarget.value = "";
    },
    [handleChange]
  );
  const {
    grid: { alive, n_rows, n_cols },
    start,
    stop,
    isPlaying,
    next,
  } = useGameOfLife(initialGrid || [[]]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    uploadingError &&
      enqueueSnackbar(uploadingError.msg, {
        variant: "error",
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
  }, [enqueueSnackbar, uploadingError]);

  useEffect(() => {
    uploadedGrid && setInitialGrid(uploadedGrid);
  }, [uploadedGrid]);

  return (
    <Layout>
      <Suspense
        loading={loading}
        fallback={
          <Backdrop
            open={loading}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <CircularProgress />
          </Backdrop>
        }
      >
        <Container
          maxWidth="xl"
          sx={{
            flex: "1 1 auto",
            py: 3,
            backgroundColor: (theme) => theme.palette.grey[400],
          }}
        >
          <Paper
            sx={(theme) => ({
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.grey[300],
            })}
            variant="outlined"
            square
          >
            <Grid alive={alive} rows={n_rows} cols={n_cols} cellSize={50} />
          </Paper>
        </Container>
        <Box
          sx={{
            flex: "0 1 110px",
            backgroundColor: (theme) => theme.palette.grey[900],
            p: 2
          }}
        >
          <CommandBar
            isPlaying={isPlaying}
            onStart={start}
            onStop={stop}
            onNext={next}
            onUpload={handleUpload}
            onReset={() => {
              setInitialGrid((cur) => ({ ...cur }));
            }}
          />
        </Box>
      </Suspense>
    </Layout>
  );
};

export default GameOfLife;
