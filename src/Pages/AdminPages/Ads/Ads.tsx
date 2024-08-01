import { TableHeader } from "@/Components";
import { AdsData } from "@/Redux/Features/Admin/Ads/AdsSlice";
import { Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopupList from "@/Components/Shared/PopupList/PopupList";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "@/Components/Shared/DeleteDialog/DeleteDialog";
import "./Ads.module.scss";
import { Helmet } from 'react-helmet'
const Ads = () => {
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
  {
    /*moveToEdit screen */
  }
  const moveToEdit = () => {
    navigate(`/dashboard/add-new-ads/${roomId}`, {
      state: { isEdit: true },
    });
  };
  {
    /*view dialog */
  }
  const handleViewDialog = () => {
    setOpenViewDialog(true);
    setAnchorEl(null);
  };
  {
    /*delete Dialog Modal  */
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const getAdsData = useCallback(async () => {

    try {
      // @ts-ignore
      const element = await dispatch(AdsData());
      // @ts-ignore
      setTableData(element.payload.data.ads);
    } finally {

    }
  }, [dispatch]);

  useEffect(() => {
    getAdsData();
  }, []);

  const tableBody: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "Room Number",
      width: 235,
      editable: false,
      renderCell: (params) => {
        return params?.row?.room?.roomNumber;
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 235,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
        );
      },
    },

    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 235,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Is Active ",
      width: 235,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Chip
              size="small"
              label={`${params.formattedValue}`}
              color={`${params.formattedValue === !!"true" ? "success" : "error"
                }`}
              variant="filled"
            />
          </Stack>
        );
      },
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
              getData={getAdsData}
              handleCloseDialog={handleCloseDialog}
              openDialog={openDialog}
              itemId={roomId}
            />

            <PopupList
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              anchorEl={anchorEl}
              handleViewDialog={handleViewDialog}
              moveToEdit={moveToEdit}
              handleOpenDialog={handleOpenDialog}
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
        <title> Ads Page • Staycation</title>
      </Helmet>
      <TableHeader
        title={"Ads"}
        subTitle={"Ads"}
        path={"/dashboard/add-new-ads"}
      />

      <DataGrid
        className="dataGrid tableStyle"
        rows={tableData}
        columns={tableBody}
        rowSelectionModel={"server"}
        loading={loading}
        getRowId={(row) => row._id}
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

export default Ads;
