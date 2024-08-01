import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import DeleteDialog from "@/Components/Shared/DeleteDialog/DeleteDialog";
import PopupList from "@/Components/Shared/PopupList/PopupList";
import ViewDialogModal from "@/Components/Shared/ViewDialogModal/ViewDialogModal";
import { RoomsData } from "@/Redux/Features/Admin/Rooms/GetRoomsSlice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Rooms.module.scss";
import { Helmet } from 'react-helmet';
const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  /*Handle popup menu */

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setRoomId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /*************popUp************** */


  /* Dialog Modal  */

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  /*view dialog */

  const handleViewDialog = () => {
    setOpenViewDialog(true);
    setAnchorEl(null);
  };
  const handleCloseViewDialog = () => setOpenViewDialog(false);

  /* move to edit  */

  const moveToEdit = () => {
    navigate(`/dashboard/rooms/add-new/${roomId}`, { state: { isEdit: true } });
  };

  /*get Room */

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(RoomsData());
      // @ts-ignore
      setTableData(element.payload.data.rooms);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const tableBody: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "RoomNumber",
      width: 180,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
      editable: false,
    },
    {
      field: "images",
      headerName: "Image",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return params.formattedValue === "" ||
          params?.row?.images[0] === undefined ? (
          <img className="img-table" src={defaultImage} alt="image" />
        ) : (
          <img
            className="img-table"
            src={params?.row?.images[0]}
            alt="image"
          />
        );
      },
    },

    {
      field: "discount",
      headerName: "Discount",
      width: 180,
      editable: false,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 180,
      editable: false,
    },

    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <>
            <DeleteDialog
              getData={getData}
              handleCloseDialog={handleCloseDialog}
              openDialog={openDialog}
              itemId={roomId}
            />

            <ViewDialogModal
              itemId={roomId}
              handleClose={handleCloseViewDialog}
              open={openViewDialog}
            />

            <PopupList
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              anchorEl={anchorEl}
              handleViewDialog={handleViewDialog}
              handleOpenDialog={handleOpenDialog}
              moveToEdit={moveToEdit}
              id={_id}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
<Helmet>
  <title> Rooms Page • Staycation</title>
</Helmet>
      <TableHeader
        title={"Rooms"}
        subTitle={"Room"}
        path={"/dashboard/rooms/add-new/"}
      />
      <DataGrid
        className="dataGrid tableStyle"
        rows={tableData}
        columns={tableBody}
        getRowId={(row) => row._id}
        rowSelectionModel={"server"}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10]}
      // checkboxSelection
      // disableRowSelectionOnClick
      // disableColumnFilter
      // disableDensitySelector
      // disableColumnSelector
      />
    </>
  );
};

export default Rooms;
