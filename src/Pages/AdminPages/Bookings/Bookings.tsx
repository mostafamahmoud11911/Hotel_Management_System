import { TableHeader } from "@/Components";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BookingData } from "@/Redux/Features/Admin/Booking/GetBookingSlice";
import moment from "moment";
import { Chip } from "@mui/material";

import PopupList from "@/Components/Shared/PopupList/PopupList";
import DeleteDialog from "@/Components/Shared/DeleteDialog/DeleteDialog";
import "./Bookings.module.scss";
import { Helmet } from 'react-helmet';

const Bookings = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [BookID, setBookID] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  /*Handle popup menu */
  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setBookID(id);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  {
    /*view dialog */
  }
  const handleViewDialog = () => {
    setOpenViewDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    getData();
  }, [dispatch]);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(BookingData());
      // @ts-ignore
      setTableData(element.payload.data.booking);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const tableBody: GridColDef[] = [
    {
      field: "room",
      headerName: "Room Number",
      width: 165,
      editable: false,
      renderCell: (params) => {

        return params?.row?.room === null ? "1002-5" : params?.row?.room?.roomNumber;
      },
    },
    {
      field: "user",
      headerName: "User Name",
      width: 165,
      editable: false,
      renderCell: (params) => {

        return params?.row?.user === null ? "Mohamed" : params?.row?.user?.userName;
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 165,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.row?.startDate).format("Do MMM YY")}</span>
        );
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return <span>{moment(params?.row?.endDate).format("Do MMM YY")}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return params?.formattedValue === "pending" ?
          <Chip label={"Pending"} size="small" color="warning" /> : params?.formattedValue === "completed" ? <Chip label={"Completed"} size="small" color="success" /> : params?.formattedValue
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <DeleteDialog
              getData={getData}
              handleCloseDialog={handleCloseDialog}
              openDialog={openDialog}
              itemId={BookID}
            />
            <PopupList
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              anchorEl={anchorEl}
              handleViewDialog={handleViewDialog}
              handleOpenDialog={handleOpenDialog}
              id={params?.row?._id}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      <Helmet>
        <title> Booking Page • Staycation</title>
      </Helmet>
      <TableHeader title={"Booking"} subTitle={"Booking"} path={""} />

      <DataGrid
        className="dataGrid tableStyle"
        rows={tableData}
        columns={tableBody}
        rowSelectionModel={"server"}
        loading={loading}
        getRowId={(row) => row?._id}
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
            quickFilterProps: { debounceMs: 300 },
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

export default Bookings;
