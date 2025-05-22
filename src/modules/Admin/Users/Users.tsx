import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react'
import BouncingLoader from '../../../components/SharedAdmin/Loader/Loader';
import { GridToolbar } from '@mui/x-data-grid/internals';
import { api } from '../../../utils/custom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoImage from '../../../assets/Images/NoImage5.png';


const paginationModel = { page: 0, pageSize: 5 };

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);



    const getAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/admin/users?page=1&size=100`);
            console.log(data);
            setUsers(data.data.users);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, [setUsers])

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers])

    const columns: GridColDef[] = [
        { field: 'userName', headerName: 'User Name', width: 140 },
        { field: 'email', headerName: 'Email', width: 140 },

        {
            field: 'profileImage', headerName: 'Image', width: 140, renderCell(params) {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <img src={params.row.profileImage ? params.row.profileImage : NoImage} style={{ borderRadius: "10%", width: "40px", height: "40px", objectFit: "cover" }} alt="" />
                    </Box>
                )
            }
        },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 140 },
        { field: 'role', headerName: 'Role', width: 140 },

        {
            field: 'createdAt', headerName: 'Created At', width: 140, renderCell(params) {
                const date = new Date(params.row.createdAt);
                return date.toLocaleDateString("en-US");
            },
        },
    ];
    return (
        <Box>
            <Box>
                <Typography variant='h5'>User Table Details</Typography>
                <Typography variant='body2'>You can check all details</Typography>
            </Box>


            {loading ? <BouncingLoader /> : <Box sx={{ width: "100%" }}>
                <DataGrid
                    className="dataGrid tableStyle"
                    getRowId={(row) => row._id}
                    rows={users}
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



        </Box>
    )
}
