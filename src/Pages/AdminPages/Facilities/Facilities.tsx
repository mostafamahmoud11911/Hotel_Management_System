import { TableHeader } from "@/Components";
import { FacilitiesData } from "@/Redux/Features/Admin/Facilities/FacilitiesSlice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Facilities.module.scss";
import PopupList from "@/Components/Shared/PopupList/PopupList";
import DeleteDialog from "@/Components/Shared/DeleteDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
const Facilities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [loading, setLoading] = useState(false);


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

  /*moveToEdit screen */

  const moveToEdit = () => {
    navigate(`/dashboard/room-facilities/update-facility/${roomId}`, {
      state: { isEdit: true },
    });
  };
  const getFacilitiesData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(FacilitiesData());
      // @ts-ignore
      setTableData(element.payload.data.facilities);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getFacilitiesData();
  }, []);

  const tableBody: GridColDef[] = [
    {
      field: "name",
      headerName: "facility Name",
      width: 240,
      editable: false,
    },
    {
      field: "createdBy",
      headerName: "createdBy",
      width: 240,
      editable: false,
      renderCell: (params) => {
        return params?.row?.createdBy === null
          ? "Anonymous"
          : params?.row?.createdBy?.userName;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 240,
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
      width: 240,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
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
              getData={getFacilitiesData}
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
        <title> Facilities Page • Staycation</title>
      </Helmet>
      <TableHeader
        title={"Facilities"}
        subTitle={"facility"}
        path={"/dashboard/room-facilities/add-new-facility"}
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
      />
    </>
  );
};

export default Facilities;
