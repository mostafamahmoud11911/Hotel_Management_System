import { Backdrop, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <>
      <Backdrop
        style={{ opacity: 0.1, backgroundColor: "rgb(4 87 253 / 4%)" }}
        sx={{
          color: "#1004fd",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress
          color="inherit"
          style={{ opacity: ".2 !important" }}
        />
      </Backdrop>
    </>
  );
};

export default LoadingComponent;
