
import { imgView3 } from "@/Assets/Images";
import { viewRoomDetails } from "@/Redux/Features/Admin/ViewDetails/viewDetailsSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  ImageListItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewDialogModal = ({ handleClose, open, itemId }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [roomDetailsData, setRoomDetailsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const viewItem = async () => {
    try {
      const viewDetails = await dispatch(viewRoomDetails(itemId));
      setRoomDetailsData(viewDetails.payload.data.room);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching room details:", error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (open) {
      setLoading(true);

      viewItem();
    }
  }, [open]);

  const { capacity, price, roomNumber, discount, images }: any =
    roomDetailsData;
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {loading ? (
          <Backdrop
            style={{ opacity: 1, backgroundColor: "#ffff" }}
            sx={{
              color: "#203FC7",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Room {roomNumber}
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  Back
                </Button>
              </Toolbar>
            </AppBar>
            <Grid container spacing={3} style={{}}>
              <Grid
                item
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                  marginTop: "3rem",
                }}
              >
                <ImageListItem
                  style={{
                    marginRight: "0",
                    width: "7rem",
                  }}
                >
                  {images.map((image, index) => (
                    <img
                      key={index}
                      style={{
                        width: `${100 / 2}%`,
                        marginTop: "1em",
                        marginLeft: "2em",
                        height: "6rem",
                        borderRadius: ".5rem",
                      }}
                      src={image}
                      onClick={handleImageClick}
                      loading="lazy"
                      alt={`room image`}
                    />
                  ))}
                </ImageListItem>
                <ImageListItem
                  style={{
                    height: "20rem",

                    maxWidth: "20rem",
                    marginTop: "1em",
                  }}
                  className="mainImage"
                >
                  {images?.length > 0 ? (
                    <>
                      <img
                        style={{ objectFit: "cover", height: "300px", width: "100%", borderRadius: ".5rem" }}
                        src={images[currentImageIndex]}
                        loading="lazy"
                        alt={`room image`}
                      />
                    </>
                  ) : (
                    <img
                      style={{ width: "100%", borderRadius: ".5rem" }}
                      src={imgView3}
                      loading="lazy"
                      alt={`room image`}
                    />
                  )}
                </ImageListItem>
              </Grid>
              <Grid item md={6} style={{ marginTop: "3rem" }}>
                <Box style={{ marginTop: ".5em" }}>
                  <Typography variant="h5" gutterBottom>
                    About Room
                  </Typography>
                  <Typography style={{ width: "70%" }}>
                    Minimal techno is a minimalist subgenre of techno music. It
                    is characterized by a stripped-down aesthetic that exploits
                    the use of repetition and understated development. Minimal
                    techno is thought to have been originally developed in the
                    early 1990s by Detroit-based producers Robert Hood and
                    Daniel Bell.
                  </Typography>
                  <Typography gutterBottom style={{ marginTop: ".5em" }}>
                    Capacity : {capacity}
                  </Typography>
                  <Typography gutterBottom>Price : {price}</Typography>
                  <Typography gutterBottom>
                    After Discount : {price - discount}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ViewDialogModal;
