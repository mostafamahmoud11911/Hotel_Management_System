
import LoadingComponent from "@/Components/Shared/Loading/Loading";
import { CreateAds } from "@/Redux/Features/Admin/Ads/CreateAdsSlice";
import { updateAdsData } from "@/Redux/Features/Admin/Ads/UpdateAdsSlice";
import { getAdsDetailsData } from "@/Redux/Features/Admin/Ads/getAdsDetalisSlice";
import { RoomsData } from "@/Redux/Features/Admin/Rooms/GetRoomsSlice";
import { ChevronRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddNewAds.module.scss";
import { motion } from "framer-motion"
const AddNewAds = () => {
  const [isActive, setIsActive] = useState("");
  const [defRoomId, setDefRoomId] = useState("");

  const [loading, setLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const { isEdit } = location.state;
  const [loadingBtn, setLoadingBtn] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const required = "This Field is required";

  //? ***************Get Rooms Id ***************

  const getData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(RoomsData());
      // @ts-ignore
      setRoomsData(element.payload.data.rooms);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  }, [setRoomsData, dispatch]);
  const [roomId, setRoomId] = useState("");

  //? ***************Get details Data***************
  const getDetailsAds = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const detailsAdsData = await dispatch(getAdsDetailsData(id));
      const roomDetails = detailsAdsData?.payload.data?.ads;
      const initActiveValue =
        roomDetails?.isActive !== undefined && String(roomDetails?.isActive);
      setIsActive(initActiveValue);

      setValue("discount", roomDetails?.room?.discount);

      setRoomId(`${roomDetails?.room?._id}`);
      setDefRoomId(roomDetails?.room._id);
      setValue("room", defRoomId);
    } catch (error) {
      toast.error("Error fetching existing data:", error);
    } finally {
      setLoading(false);
    }
  };
  //? ***************Send Data***************

  const sendData = async (data: any) => {
    setLoadingBtn(true);
    if (!isEdit) {
      // @ts-ignore
      const createAdsData = await dispatch(CreateAds({ ...data }));
      if (createAdsData?.payload?.message === "Ads created successfully") {
        setLoadingBtn(false);
        toast.success("Ads Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/ads");
      } else {
        toast.error(createAdsData?.payload?.response?.data?.message, {
          autoClose: 2000,
          theme: "colored",
        });
        setLoadingBtn(false);
      }
    } else {
      const updateAds = await dispatch(updateAdsData({ ...data, id }));
      // @ts-ignore
      if (updateAds?.payload?.success) {
        setLoading(false);
        toast.success("Ads Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/ads");
      } else {
        setLoading(false);
        toast.error("Ads Was Not Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };
  useEffect(() => {
    getData();
    if (isEdit) {
      getDetailsAds();
    }
  }, []);
  const MotionButton = motion(Button)
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        roomsData.length > 0 && (
          <>
            <Box
              className="formContainer"
              component="form"
              onSubmit={handleSubmit(sendData)}
            >
              {isEdit ? (
                <TextField
                  label="select Room"
                  className="roomNumber"
                  color="secondary"
                  select
                  disabled={isEdit}
                  defaultValue={isEdit ? defRoomId : false}
                  {...(!isEdit &&
                    register("room", {
                      required,
                    }))}
                  error={!!errors.room}
                  helperText={
                    !!errors.room ? errors?.room?.message?.toString() : null
                  }
                >
                  {roomsData?.map(({ _id, roomNumber }: any) => (
                    <MenuItem key={_id} value={_id}>
                      {roomNumber}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  label="Select Room"
                  className="roomNumber"
                  color="secondary"
                  select
                  {...register("room", {
                    required,
                  })}
                  error={!!errors.room}
                  helperText={
                    !!errors.room ? errors?.room?.message?.toString() : null
                  }
                >
                  {roomsData?.map(({ _id, roomNumber }: any) => (
                    <MenuItem key={_id} value={_id}>
                      {roomNumber}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <Box className="middleInputs">
                <TextField
                  variant="filled"
                  type="number"
                  className="discount"
                  label="Discount"
                  color="secondary"
                  {...register("discount", {
                    required,
                    valueAsNumber: true,
                    validate: (value) =>
                      (value !== undefined && +value >= 0) ||
                      "Please enter a positive number",
                  })}
                  error={!!errors.discount}
                  helperText={
                    !!errors.discount
                      ? errors?.discount?.message?.toString()
                      : null
                  }
                />

                <TextField
                  label="Status"
                  className="discount"
                  color="secondary"
                  select
                  defaultValue={isActive}
                  {...register("isActive", {
                    required,
                  })}
                  error={!!errors.isActive}
                  helperText={
                    !!errors.isActive
                      ? errors?.isActive?.message?.toString()
                      : null
                  }
                >
                  <MenuItem value={"true"}>Active</MenuItem>
                  <MenuItem value={"false"}>Not Active</MenuItem>
                </TextField>
              </Box>

              <Box className="btnContainer">
                <Link to={"/dashboard/ads"}>
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
          </>
        )
      )}
    </>
  );
};

export default AddNewAds;
