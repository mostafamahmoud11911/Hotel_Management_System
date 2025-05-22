import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react'
import BouncingLoader from '../../../components/SharedAdmin/Loader/Loader'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { GridToolbar } from '@mui/x-data-grid/internals';
import { Delete, Edit, MoreVert, Visibility } from '@mui/icons-material';
import ViewModal from '../../../components/SharedAdmin/FacilitiesModals/ViewModal';
import DeleteModal from '../../../components/SharedAdmin/FacilitiesModals/DeleteModal';
import ActionModal from '../../../components/SharedAdmin/FacilitiesModals/ActionModal';



const paginationModel = { page: 0, pageSize: 5 };





export default function Facilities() {
  const [allFacilities, setAllFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [facilityId, setFacilityId] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setFacilityId(id)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isActionOpen, setIsActionOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);




  const handleViewModalOpen = () => {
    setIsViewOpen(true);
    handleClose();
  };

  const handleViewModalClose = useCallback(() => {
    setIsViewOpen(false);
  }, []);

  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
    handleClose();
  };

  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteOpen(false);
  }, []);

  const handleActionModalOpen = (isEdit: boolean) => {
    setIsActionOpen(true);
    setIsEdit(isEdit);
    handleClose();
  };

  const handleActionModalClose = useCallback(() => {
    setIsActionOpen(false);
  }, []);

  const ITEM_HEIGHT = 48;
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'createdAt', headerName: 'Created At', width: 250 },
    {
      field: 'action', headerName: 'Action', width: 200, renderCell(params) {

        return (
          <>

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.row._id)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                },
              }}
            >

              <MenuItem sx={{ display: "flex", gap: "10px" }} onClick={handleViewModalOpen}>
                <Visibility sx={{ color: "#1565c0" }} />
                View
              </MenuItem>
              <MenuItem sx={{ display: "flex", gap: "10px" }} onClick={handleDeleteModalOpen}>
                <Delete sx={{ color: "#1565c0" }} />
                Delete
              </MenuItem>
              <MenuItem sx={{ display: "flex", gap: "10px" }} onClick={() => { handleActionModalOpen(true) }}>
                <Edit sx={{ color: "#1565c0" }} />
                Edit
              </MenuItem>
            </Menu>
          </>
        )
      },
    },
  ];

  const getAllFacilities = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get("/admin/room-facilities?page=1&size=100");
      setAllFacilities(data.data.facilities);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setLoading(false)
    }
  }, [setAllFacilities])


  useEffect(() => {
    getAllFacilities()
  }, [getAllFacilities]);


  const facilities = allFacilities.map((all: { _id: string, name: string, createdAt: string }) => { return { ...all, createdAt: new Date(all?.createdAt).toLocaleString("en-US") } })


  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, justifyContent: { md: "space-between", xs: "start" }, alignItems: { md: "center", xs: "start" }, }}>
        <Box>
          <Typography variant='h5'>Facilities Table Details</Typography>
          <Typography variant='body2'>You can check all details</Typography>
        </Box>
        <Button variant='contained' onClick={() => handleActionModalOpen(false)}>
          Add New Facility
        </Button>
      </Box>

      {loading ? <BouncingLoader /> : <Box sx={{ width: "100%" }}>
        <DataGrid
          className="dataGrid tableStyle"
          getRowId={(row) => row._id}
          rows={facilities}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, overflow: "auto" }}

        />
      </Box>}



      <ViewModal isOpen={isViewOpen} handleClose={handleViewModalClose} facilityId={facilityId} />
      <DeleteModal isOpen={isDeleteOpen} handleClose={handleDeleteModalClose} facilityId={facilityId} getAllFacilities={getAllFacilities} />
      <ActionModal isOpen={isActionOpen} handleClose={handleActionModalClose} facilityId={facilityId} getAllFacilities={getAllFacilities} isEdit={isEdit} />
    </Box>
  )
}
