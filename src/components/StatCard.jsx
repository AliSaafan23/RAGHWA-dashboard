import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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

function StatCard({ stat }) {
  return (
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
  );
}

export default StatCard;
