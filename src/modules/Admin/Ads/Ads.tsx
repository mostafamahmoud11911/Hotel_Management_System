import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react'
import BouncingLoader from '../../../components/SharedAdmin/Loader/Loader'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { GridToolbar } from '@mui/x-data-grid/internals';
import { Delete, Edit, MoreVert, Visibility } from '@mui/icons-material';
import ViewModal from '../../../components/SharedAdmin/AdsModals/ViewModal';
import DeleteModal from '../../../components/SharedAdmin/AdsModals/DeleteModal';
import ActionModal from '../../../components/SharedAdmin/AdsModals/ActionModal';



const paginationModel = { page: 0, pageSize: 5 };

export default function Ads() {

    const [allads, setAllAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adId, setAdId] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {

        setAdId(id)
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
        setIsEdit(isEdit);
        setIsActionOpen(true);
        handleClose();
    };

    const handleActionModalClose = useCallback(() => {
        setIsActionOpen(false);
    }, []);

    const ITEM_HEIGHT = 48;
    const columns: GridColDef[] = [
        {
            field: 'roomNumber', headerName: 'Room', width: 150, renderCell: (params) => {
                return params.row.room.roomNumber
            }
        },
        {
            field: 'price', headerName: 'Price', width: 150, renderCell: (params) => {
                return params.row.room.price
            }
        },
        {
            field: 'discount', headerName: 'Discount', width: 150, renderCell: (params) => {
                return params.row.room.discount
            }
        },
        {
            field: 'capacity', headerName: 'Capacity', width: 150, renderCell: (params) => {
                return params.row.room.capacity
            }
        },
        {
            field: 'isActive', headerName: 'Is Active', width: 150, renderCell(params) {
                return params.row.isActive ? 'Active' : 'In active'
            },
        },
        { field: 'createdAt', headerName: 'Created At', width: 150, renderCell(params) { return new Date(params.row.createdAt).toLocaleDateString("en-US") } },
        {
            field: 'action', headerName: 'Action', width: 70, renderCell(params) {

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

                            <MenuItem onClick={handleViewModalOpen} sx={{ display: "flex", gap: 1 }}>
                                <Visibility color='primary' />
                                <Typography component="span">View</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleDeleteModalOpen} sx={{ display: "flex", gap: 1 }}>
                                <Delete color='primary' />
                                <Typography component="span">Delete</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleActionModalOpen(true)} sx={{ display: "flex", gap: 1 }}>
                                <Edit color='primary' />
                                <Typography component="span">Edit</Typography>
                            </MenuItem>
                        </Menu>
                    </>
                )
            },
        },
    ];

    const getAllAds = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await api.get("/admin/ads");
            setAllAds(data.data.ads);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message ||
                'An unexpected error occurred');
        } finally {
            setLoading(false)
        }
    }, [setAllAds])


    useEffect(() => {
        getAllAds()
    }, [getAllAds]);


    //   const facilities = allads.map((all: { _id: string, name: string, createdAt: string }) => { return { ...all, createdAt: new Date(all?.createdAt).toLocaleString("en-US") } })





    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, justifyContent: { md: "space-between", xs: "start" }, alignItems: { md: "center", xs: "start" }, }}>
                <Box>
                    <Typography variant='h5'>Ads Table Details</Typography>
                    <Typography variant='body2'>You can check all details</Typography>
                </Box>
                <Button variant='contained' onClick={() => handleActionModalOpen(false)}>
                    Add New Ad
                </Button>
            </Box>

            {loading ? <BouncingLoader /> : <Box sx={{ width: "100%" }}>
                <DataGrid
                    className="dataGrid tableStyle"
                    getRowId={(row) => row._id}
                    rows={allads}
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



            <ViewModal isOpen={isViewOpen} handleClose={handleViewModalClose} adId={adId} />
            <DeleteModal isOpen={isDeleteOpen} handleClose={handleDeleteModalClose} adId={adId} getAllAds={getAllAds} />
            <ActionModal isOpen={isActionOpen} handleClose={handleActionModalClose} adId={adId} getAllAds={getAllAds} isEdit={isEdit} />
        </Box>
    )
}
