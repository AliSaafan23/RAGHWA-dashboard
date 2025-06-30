import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
// Removed individual icon imports (DirectionsCarIcon, AttachMoneyIcon, AccessTimeIcon, PeopleIcon)
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import WashingQueueCard from "../components/WashingQueueCard";
import BranchCard from "../components/BranchCard";
import StatCard from "../components/StatCard";

// Removed stats data from here

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 6,
        bgcolor: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "'Cairo', 'Segoe UI', sans-serif",
        direction: "rtl",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          overflow: "auto",
          position: "relative",
          borderRadius: "16px",
          backgroundColor: "white",
          margin:"16px 0px 0px 16px",


        }}
      >
        {/* Water drop animation in background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                background:
                  "radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 70%)",
                borderRadius: "50%",
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 200 + 100],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </Box>

        <TopBar title="مغسلة السيارات الذكية" />

        {/* Refresh button with animation */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <motion.div whileTap={{ rotate: 360, transition: { duration: 0.5 } }}>
            <IconButton
              onClick={handleRefresh}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <RefreshIcon
                sx={{ color: refreshing ? "#2196f3" : "text.secondary" }}
              />
            </IconButton>
          </motion.div>
        </Box>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Render StatCard directly, as it now contains the data and mapping */}
          <StatCard />
        </motion.div>

        {/* Current Washing Status and Services */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <WashingQueueCard />
          </Grid>
        </Grid>

        {/* Branch Management Section */}
        <BranchCard />
      </Box>
    </Box>
  );
}

export default Dashboard;
