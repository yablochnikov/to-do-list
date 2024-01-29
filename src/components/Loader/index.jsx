// components
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box className="loader-container">
      <CircularProgress className="loader" />
    </Box>
  );
};

export default Loader;
