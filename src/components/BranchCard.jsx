import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Button,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BusinessIcon from "@mui/icons-material/Business";

const branches = [
  {
    id: 1,
    name: "الفرع الرئيسي",
    location: "شارع الملك فهد",
    status: "مفتوح",
    carsToday: 87,
    revenue: 28500,
    staffCount: 12,
    utilization: 85,
  },
  {
    id: 2,
    name: "فرع الشمال",
    location: "حي النزهة",
    status: "مفتوح",
    carsToday: 45,
    revenue: 12000,
    staffCount: 8,
    utilization: 65,
  },
  {
    id: 3,
    name: "فرع الشرق",
    location: "طريق الدمام",
    status: "مغلق",
    carsToday: 0,
    revenue: 0,
    staffCount: 6,
    utilization: 0,
  },
  {
    id: 4,
    name: "فرع الغرب",
    location: "حي السلامة",
    status: "مفتوح",
    carsToday: 22,
    revenue: 5000,
    staffCount: 5,
    utilization: 40,
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

function BranchCard() {
  return (
    <motion.div variants={itemVariants}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <BusinessIcon sx={{ mr: 1, color: "#2196f3" }} />
              إدارة الفروع
            </Typography>
            <Chip
              label={`${
                branches.filter((b) => b.status === "مفتوح").length
              } من ${branches.length}`}
              size="small"
              sx={{ bgcolor: "#e3f2fd", color: "#2196f3" }}
            />
          </Box>
          <Divider />

          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  p: 3,
                  borderBottom:
                    index !== branches.length - 1
                      ? "1px solid rgba(0, 0, 0, 0.05)"
                      : "none",
                  bgcolor:
                    branch.status === "مغلق" ? "rgba(0, 0, 0, 0.02)" : "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StorefrontIcon
                      sx={{
                        color:
                          branch.status === "مفتوح" ? "#2196f3" : "#9e9e9e",
                        mr: 1.5,
                        fontSize: 28,
                      }}
                    />
                    <Box>
                      <Typography fontWeight="bold" fontSize="1.1rem">
                        {branch.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            color: "text.secondary",
                            fontSize: 16,
                            mr: 0.5,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {branch.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={branch.status}
                      size="small"
                      sx={{
                        bgcolor:
                          branch.status === "مفتوح"
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(158, 158, 158, 0.1)",
                        color:
                          branch.status === "مفتوح" ? "#4caf50" : "#9e9e9e",
                        fontWeight: "medium",
                        mr: 1,
                      }}
                    />
                    <IconButton size="small">
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(33, 150, 243, 0.05)",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        السيارات اليوم
                      </Typography>
                      <Typography fontWeight="bold" fontSize="1.2rem">
                        {branch.carsToday}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(76, 175, 80, 0.05)",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        الإيرادات
                      </Typography>
                      <Typography fontWeight="bold" fontSize="1.2rem">
                        {branch.revenue.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(233, 30, 99, 0.05)",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        الموظفين
                      </Typography>
                      <Typography fontWeight="bold" fontSize="1.2rem">
                        {branch.staffCount}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(255, 152, 0, 0.05)",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        نسبة الاستخدام
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography fontWeight="bold" fontSize="1.2rem">
                          {branch.utilization}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={branch.utilization}
                          sx={{
                            ml: 1,
                            width: 60,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(255, 152, 0, 0.2)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#ff9800",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          ))}

          <Box sx={{ p: 3, textAlign: "center" }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outlined"
                startIcon={<StorefrontIcon />}
                sx={{
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  "&:hover": {
                    borderColor: "#1976d2",
                    bgcolor: "rgba(33, 150, 243, 0.05)",
                  },
                }}
              >
                إضافة فرع جديد
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BranchCard;
