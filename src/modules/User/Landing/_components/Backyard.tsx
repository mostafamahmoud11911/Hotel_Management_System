import { Box, Typography } from '@mui/material'
import backyard1 from "../../../../assets/Images/backyard1.png"
import backyard2 from "../../../../assets/Images/backyard2.png"
import backyard3 from "../../../../assets/Images/backyard3.png"
import backyard4 from "../../../../assets/Images/backyard4.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMemo } from 'react'

export default function Backyard() {






  const backyards = useMemo(() => [
    {
      id: crypto.randomUUID(),
      name: "Tabby Town",
      img: backyard1,
      desc: "Gunung Batu, Indonesia"
    },
    {
      id: crypto.randomUUID(),
      name: "Anggana",
      img: backyard2,
      desc: "Bogor, Indonesia"
    },
    {
      id: crypto.randomUUID(),
      name: "Seattle Rain",
      img: backyard3,
      desc: "Jakarta, Indonesia"
    },
    {
      id: crypto.randomUUID(),
      name: "Wodden Pit",
      img: backyard4,
      desc: "Wonosobo, Indonesia"
    }
  ], []);

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4,  1fr)", sm: "repeat(3,  1fr)", xs: "repeat(2,  1fr)" }, gap: 2, position: "relative" }}>
        {backyards.map((backyard, index) => (
          <Box key={backyard.id} sx={{ position: "relative" }}>
            {index === 0 && <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#FF498B", color: "white", padding: "4px 8px", borderRadius: "0 8px 0 8px" }}>Popular Choice</Box>}
            <Box>
              <LazyLoadImage src={backyard.img} effect="blur" placeholderSrc={backyard.img} loading="eager" width={"100%"} height={"200px"} style={{ objectFit: "cover", borderRadius: "8px" }} alt={backyard.name} onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }} />
              <Typography variant="body1" fontWeight={"bold"}>{backyard.name}</Typography>
              <Typography variant="body2">{backyard.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
