import React, { useCallback, useEffect, useState } from 'react'
import RoomDelete from '../../../components/SharedAdmin/RoomDeleteModal/RoomDelete'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import BouncingLoader from '../../../components/SharedAdmin/Loader/Loader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { GridToolbar } from '@mui/x-data-grid/internals'
import { api } from '../../../utils/custom'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router'
import { Rooms as RoomType } from '../../../types/types'


const paginationModel = { page: 0, pageSize: 5 };

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState<RoomType | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, room: RoomType) => {

        setRoom(room);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDeleteModalOpen = () => {
        setIsDeleteOpen(true);
        handleClose();
    };

    const handleDeleteModalClose = useCallback(() => {
        setIsDeleteOpen(false);
    }, []);



    const getAllRooms = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/rooms?page=1&size=100");
            setRooms(data.data.rooms);
            setLoading(false);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message ||
                'An unexpected error occurred');
        }
    }, [setRooms])




    useEffect(() => {
        getAllRooms()
    }, [getAllRooms])


    const goToRoomData = () => {
        navigate("/dashboard/roomData")
    }

    const ITEM_HEIGHT = 48;
    const columns: GridColDef[] = [
        { field: 'roomNumber', headerName: 'Room Number', width: 140 },
        { field: 'price', headerName: 'Price', width: 140 },

        { field: 'capacity', headerName: 'Capacity', width: 140 },
        { field: 'discount', headerName: 'Discount', width: 140 },

        {
            field: 'createdAt', headerName: 'Created At', width: 140, renderCell(params) {
                const date = new Date(params.row.createdAt);
                return date.toLocaleDateString("en-US");
            },
        },
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
                            onClick={(e) => handleClick(e, params.row)}
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

                            <MenuItem sx={{ display: "flex", gap: "10px" }} onClick={handleDeleteModalOpen}>
                                <Delete sx={{ color: "#1565c0" }} />
                                Delete
                            </MenuItem>
                            <MenuItem sx={{ display: "flex", gap: "10px" }}>
                                <Link to={`/dashboard/roomData/${room?._id}`} state={{ data: room, isEdit: "edit" }}>
                                    <Edit sx={{ color: "#1565c0" }} />
                                    Edit
                                </Link>
                            </MenuItem>
                        </Menu>
                    </>
                )
            },
        },
    ];
    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, justifyContent: { md: "space-between", xs: "start" }, alignItems: { md: "center", xs: "start" }, }}>
                <Box>
                    <Typography variant='h5'>Room Table Details</Typography>
                    <Typography variant='body2'>You can check all details</Typography>
                </Box>
                <Button variant='contained' onClick={goToRoomData}>
                    Add New Room
                </Button>
            </Box>

            {loading ? <BouncingLoader /> : <Box sx={{ width: "100%" }}>
                <DataGrid
                    className="dataGrid tableStyle"
                    getRowId={(row) => row._id}
                    rows={rooms}
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



            <RoomDelete isDeleteOpen={isDeleteOpen} handleDeleteModalClose={handleDeleteModalClose} roomId={room?._id} getAllRooms={getAllRooms} />
        </Box>
    )
}
