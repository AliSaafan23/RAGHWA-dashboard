import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";

const washingQueue = [
  {
    id: "A-123",
    type: "سيدان",
    service: "غسيل شامل",
    time: "10:15",
    status: "جاري الغسيل",
    progress: 75,
  },
  {
    id: "B-456",
    type: "دفع رباعي",
    service: "غسيل خارجي",
    time: "10:30",
    status: "في الانتظار",
    progress: 0,
  },
  {
    id: "C-789",
    type: "شاحنة صغيرة",
    service: "تلميع",
    time: "10:45",
    status: "في الانتظار",
    progress: 0,
  },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

function WashingQueueCard() {
  return (
    <motion.div variants={itemVariants}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalCarWashIcon sx={{ mr: 1, color: "#2196f3" }} />
              حالة الغسيل الحالية
            </Typography>
            <Chip
              label={`${washingQueue.length} سيارات`}
              size="small"
              sx={{ bgcolor: "#e3f2fd", color: "#2196f3" }}
            />
          </Box>
          <Divider sx={{ mb: 2 }} />

          {washingQueue.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor:
                    car.status === "جاري الغسيل"
                      ? "rgba(33, 150, 243, 0.05)"
                      : "white",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    car.status === "جاري الغسيل"
                      ? "rgba(33, 150, 243, 0.2)"
                      : "rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {car.status === "جاري الغسيل" && (
                  <LinearProgress
                    variant="determinate"
                    value={car.progress}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      bgcolor: "rgba(33, 150, 243, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#2196f3",
                      },
                    }}
                  />
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DirectionsCarIcon
                      sx={{ color: "#2196f3", mr: 1.5, fontSize: 28 }}
                    />
                    <Box>
                      <Typography fontWeight="bold">{car.id}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {car.type}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Chip
                      label={car.service}
                      size="small"
                      sx={{
                        bgcolor: "rgba(33, 150, 243, 0.1)",
                        color: "#2196f3",
                        fontWeight: "medium",
                      }}
                    />
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      الوقت المتوقع
                    </Typography>
                    <Typography fontWeight="medium">{car.time}</Typography>
                  </Box>

                  <Box>
                    <Chip
                      label={car.status}
                      size="small"
                      sx={{
                        bgcolor:
                          car.status === "جاري الغسيل"
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(255, 152, 0, 0.1)",
                        color:
                          car.status === "جاري الغسيل" ? "#4caf50" : "#ff9800",
                        fontWeight: "medium",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default WashingQueueCard;
