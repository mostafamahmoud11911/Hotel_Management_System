import { Box, Typography } from "@mui/material";
import Rate from "./Rate";
import Comment from "./Comment";




export default function Review() {


    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", mt: 6, mb: 6, gap: 2 }}>
            <Box sx={{ maxWidth: { md: "50%", xs: "100%" }, flex: { md: 1, xs: "1 0 100%" }, p: 3, borderRight: { md: "1px solid #203FC7" } }}>
                <Typography variant="h6">Rate</Typography>
                <Rate />
            </Box>
            <Box sx={{ marginLeft: { md: 6 }, maxWidth: { md: "50%", xs: "100%" }, p: 3, flex: { md: 1, xs: "1 0 100%" } }}>
                <Typography variant="h6">Add Your Comment</Typography>
                <Comment />
            </Box>
        </Box>
    )
}
