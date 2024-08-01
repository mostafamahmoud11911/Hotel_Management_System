import { CreateFacility } from "@/Redux/Features/Admin/Facilities/CreateFacilitySlice";
import { ChevronRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddNewFacility.module.scss";
import { updateFacilityData } from "@/Redux/Features/Admin/Facilities/updateFacilitySlice";
import { facilitiesDataDetails } from "@/Redux/Features/Admin/Facilities/FacilitiesDetailsSlice";
import LoadingComponent from "@/Components/Shared/Loading/Loading";
import { motion } from "framer-motion"
interface propState {
  isEdit: boolean;
}
const AddNewFacility = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const { isEdit } = location.state as propState;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const required = "This Field is required";

  //? ***************Send Data***************
  const facilityDetails = useCallback(async () => {
    setLoading(true);
    try {
      const facilityEditDetails = await dispatch(facilitiesDataDetails(id));
      const facDetails = facilityEditDetails.payload.data.facility;
      setValue("name", facDetails.name);
    } finally {
      setLoading(false);
    }
  }, [dispatch, setValue]);

  const sendData = async (data: any) => {
    setLoadingBtn(true);
    if (!isEdit) {
      // @ts-ignore
      const FacilityData = await dispatch(CreateFacility(data));
      // @ts-ignore
      if (
        FacilityData?.payload?.message === "Room Facility created successfully"
      ) {
        setLoadingBtn(false);
        toast.success("Room Facility Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/room-facilities");
      } else {
        setLoadingBtn(false);
        toast.error("Room Facility Was Not Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      const updateData = await dispatch(updateFacilityData({ data, id }));
      if (updateData?.payload?.success) {
        setLoading(false);
        toast.success("Room Facility Updated Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/room-facilities");
      } else {
        setLoading(false);
        toast.error("Room Facility Was Not Updated Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };
  useEffect(() => {
    if (isEdit) {
      facilityDetails();
    }
  }, []);
  const MotionButton = motion(Button)

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box
          className="formContainer"
          component="form"
          onSubmit={handleSubmit(sendData)}
        >
          <TextField
            variant="filled"
            type="text"
            className="roomNumber"
            label="Facility Name"
            color="secondary"
            {...register("name", {
              required,
              minLength: { value: 3, message: "minlength is 3" },
            })}
            error={!!errors.name}
            helperText={
              !!errors.name ? errors?.name?.message?.toString() : null
            }
          />

          <Box className="btnContainer">
            <Link to={"/dashboard/room-facilities"}>
              <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              variant="outlined" size="large">
                Cancel
              </MotionButton>
            </Link>

            {loadingBtn ? (
              <LoadingButton
                className="loadingButton"
                loading
                variant="outlined"
              >
                Submit
              </LoadingButton>
            ) : (
              <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              variant="contained" type="submit" size="large">
                Submit <ChevronRight />
              </MotionButton>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default AddNewFacility;
