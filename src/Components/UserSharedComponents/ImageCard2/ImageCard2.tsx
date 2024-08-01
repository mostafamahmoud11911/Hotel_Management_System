import "./ImageCard2.module.scss";
import { Box, IconButton, Typography } from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { defaultImage } from "@/Assets/Images";

interface Props {
  ele: any;
  favList: any;
  deleteFavoriteItem: any;
  addItemToFavorite?: any;
  bookingGuestCount?: any;
  selectedDateRange?: any;
  disabled?: boolean;
}

const ImageCard2 = ({
  selectedDateRange,
  ele,
  favList,
  deleteFavoriteItem,
  addItemToFavorite,
  bookingGuestCount,
  disabled,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Box key={ele?._id} className={`roomCard`}>
        <img className="RoomPicture2" src={ele?.images[0] ? ele?.images[0] : defaultImage} style={{objectFit:"cover"}} alt="RoomPicture" />
        {ele?.discount ? (
          <Box
            className="discountLayer"
            fontSize={"clamp(.5rem, 2.5vw, 1rem) "}
          >
            {ele?.discount}$ {t("perNight")}
          </Box>
        ) : null}
        <Box className="layer2">
          <Box className="text ">
            <Typography variant="h6" className="roomName">
              {ele?.roomNumber?.toUpperCase()}
            </Typography>
            <Box className="icons">
              {favList?.some((favorite: any) => favorite?._id === ele?._id) ? (
                <IconButton
                  className="color opacity"
                  disabled={disabled}
                  onClick={() => deleteFavoriteItem(ele._id)}
                >
                  <Favorite color="error" />
                </IconButton>
              ) : (
                <IconButton
                  className="color"
                  disabled={disabled}
                  onClick={() => addItemToFavorite(ele?._id)}
                >
                  <Favorite />
                </IconButton>
              )}
              <IconButton
                className="color"
                onClick={() =>
                  navigate(`/room-details`, {
                    state: {
                      range: selectedDateRange,
                      persons: bookingGuestCount,
                      roomId: ele?._id,
                    },
                  })
                }
              >
                <Visibility />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ImageCard2;
