import { Box, Typography } from '@mui/material'
import living1 from "../../../../assets/Images/living1.png"
import living2 from "../../../../assets/Images/living2.png"
import living3 from "../../../../assets/Images/living3.png"
import living4 from "../../../../assets/Images/living4.png"
import { useMemo } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";


function LivingRoom() {
    const backyards = useMemo(() => [
        {
            id: crypto.randomUUID(),
            name: "Green Park",
            img: living1,
            desc: "Tangerang, Indonesia"
        },
        {
            id: crypto.randomUUID(),
            name: "Podo Wae",
            img: living2,
            desc: "Madiun, Indonesia"
        },
        {
            id: crypto.randomUUID(),
            name: "Silver Rain",
            img: living3,
            desc: "Bandung, Indonesia"
        },
        {
            id: crypto.randomUUID(),
            name: "Cashville",
            img: living4,
            desc: "Kemang, Indonesia"
        }
    ], []);
    return (
        <Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4,  1fr)", sm: "repeat(3,  1fr)", xs: "repeat(2,  1fr)" }, gap: 2, position: "relative" }}>
                {backyards.map((backyard, index) => (
                    <Box key={backyard.id} sx={{ position: "relative" }}>
                        {index === backyards.length - 1 && <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#FF498B", color: "white", padding: "4px 8px", borderRadius: "0 8px 0 8px" }}>Popular Choice</Box>}
                        <Box>
                            <LazyLoadImage src={backyard.img} width="100%" height={200} loading='eager' effect='blur' style={{ objectFit: "cover", borderRadius: "8px" }} alt={backyard.name} />
                            <Typography variant="body1" fontWeight={"bold"}>{backyard.name}</Typography>
                            <Typography variant="body2">{backyard.desc}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}


export default LivingRoom