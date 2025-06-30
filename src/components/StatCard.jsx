import React from "react";
import { Card, CardContent, Typography, Box, Chip, Grid } from "@mui/material"; // Added Grid
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// Added icon imports
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

// Stats data moved here
const stats = [
  {
    title: "سيارات اليوم",
    value: "154",
    subtitle: "عدد السيارات",
    icon: <DirectionsCarIcon />,
    color: "#3f51b5",
    increase: "+12%",
  },
  {
    title: "الإيرادات",
    value: "45,500",
    subtitle: "ريال سعودي",
    icon: <AttachMoneyIcon />,
    color: "#4caf50",
    increase: "+8%",
  },
  {
    title: "وقت الانتظار",
    value: "15",
    subtitle: "دقيقة",
    icon: <AccessTimeIcon />,
    color: "#ff9800",
    increase: "-5%",
  },
  {
    title: "رضا العملاء",
    value: "98%",
    subtitle: "معدل الرضا",
    icon: <PeopleIcon />,
    color: "#e91e63",
    increase: "+2%",
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

function StatCard() { // Removed 'stat' prop
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}> {/* Added Grid container */}
      {stats.map((stat, index) => ( // Map over stats array
        <Grid item xs={12} sm={6} md={3} key={index}> {/* Each stat is a Grid item */}
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "5px",
                  background: stat.color,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      fontWeight="medium"
                      fontSize="0.9rem"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.subtitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: `${stat.color}15`,
                      p: 1.5,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: stat.color, fontSize: 28 },
                    })}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Chip
                    size="small"
                    icon={<TrendingUpIcon fontSize="small" />}
                    label={stat.increase}
                    sx={{
                      bgcolor: stat.increase.includes("+")
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(244, 67, 54, 0.1)",
                      color: stat.increase.includes("+")
                        ? "success.main"
                        : "error.main",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    مقارنة بالأمس
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatCard;
