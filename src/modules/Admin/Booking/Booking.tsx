import { Delete, MoreVert } from "@mui/icons-material";
import { Box, Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import BouncingLoader from "../../../components/SharedAdmin/Loader/Loader";
import { GridToolbar } from "@mui/x-data-grid/internals";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { api } from "../../../utils/custom";
import ViewModal from "../../../components/SharedAdmin/BookingModals/DeleteModal";



const paginationModel = { page: 0, pageSize: 5 };


export default function Booking() {
    const [bookingList, setBookingList] = useState([]);
    const [bookingId, setBookingId] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setBookingId(id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleModalClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleModalOpen = () => {
        setIsOpen(true);
        setAnchorEl(null);
    };



    const getAllBookings = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await api.get("/admin/booking?page=1&size=100");
            setBookingList(data.data.booking);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false)
        }
    }, [setBookingList])





    useEffect(() => {
        getAllBookings();
    }, [getAllBookings])






    const ITEM_HEIGHT = 48;
    const columns: GridColDef[] = [
        {
            field: 'roomNumber', headerName: 'Room Number', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <Typography variant="body2">{params.row.room?.roomNumber || "Deleted Room"}</Typography>
                    </Box>
                );
            },
        },
        {
            field: 'userName', headerName: 'User Name', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <Typography variant="body2">{params.row.user?.userName}</Typography>
                    </Box>
                );
            }
        },

        { field: 'totalPrice', headerName: 'Total Price', width: 140 },
        {
            field: 'startDate', headerName: 'Start Date', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <Typography variant="body2">{new Date(params.row.startDate).toLocaleDateString()}</Typography>
                    </Box>
                );
            },
        },

        {
            field: 'endDate', headerName: 'End Date', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <Typography variant="body2">{new Date(params.row.endDate).toLocaleDateString()}</Typography>
                    </Box>
                );
            }
        },
        {
            field: 'status', headerName: 'Status', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <Chip label={params.row.status} color={params.row.status === "pending" ? "warning" : "success"}>{params.row.status}</Chip>
                    </Box>
                );
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
                            <MenuItem sx={{ display: "flex", gap: "10px" }} onClick={handleModalOpen}>
                                <Delete sx={{ color: "#1565c0" }} />
                                Delete
                            </MenuItem>
                        </Menu>
                    </>
                )
            },
        },
    ];
    return (
        <Box>
            <Box>
                <Typography variant='h5'>Booking Table Details</Typography>
                <Typography variant='body2'>You can check all details</Typography>
            </Box>



            {loading ? <BouncingLoader /> : <Box sx={{ width: "100%" }}>
                <DataGrid
                    className="dataGrid tableStyle"
                    getRowId={(row) => row._id}
                    rows={bookingList}
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
            <ViewModal isOpen={isOpen} handleModalClose={handleModalClose} bookingId={bookingId} getAllBookings={getAllBookings} />
        </Box>
    )
}
