import { Box } from "@mui/material";
import { motion } from "motion/react"



const BouncingLoader = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, my: "10rem" }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    style={{
                        width: 15,
                        height: 15,
                        backgroundColor: "#3498db",
                        borderRadius: "50%"
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                />
            ))}
        </Box>
    );
};

export default BouncingLoader;