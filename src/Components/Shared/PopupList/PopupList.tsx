
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useLocation } from "react-router-dom";

const PopupList = ({
  handleClickMenu,
  anchorEl,
  handleCloseMenu,
  handleViewDialog,
  handleOpenDialog,
  moveToEdit,
  id,
}:any) => {
  const { pathname } = useLocation();
  const currentUrl = pathname.split("/").pop();

  const ITEM_HEIGHT = 48;
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClickMenu(e, id)}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuList>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {currentUrl === "rooms" ? (
            <MenuItem onClick={handleViewDialog}>
              <ListItemIcon style={{ color: indigo[500] }}>
                <VisibilityIcon />
              </ListItemIcon>
              View
            </MenuItem>
          ) : (
            ""
          )}
          {currentUrl !== "booking" && (
            <MenuItem onClick={moveToEdit}>
              <ListItemIcon style={{ color: indigo[500] }}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          )}

          <MenuItem onClick={handleOpenDialog}>
            <ListItemIcon style={{ color: indigo[500] }}>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </MenuList>
    </>
  );
};

export default PopupList;
