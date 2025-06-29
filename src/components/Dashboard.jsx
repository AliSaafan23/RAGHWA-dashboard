import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GroupIcon from "@mui/icons-material/Group";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const drawerWidth = 280;

export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        direction: "rtl", // Add this line
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="right" // Add this line
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0a3a7e",
            color: "#fff",
            borderRadius: 6,
            m: 2,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          {/* Logo */}
          <Box sx={{ mb: 6 }}>
            <img
              src="../../public/صورة1.jpg"
              alt="Logo"
              style={{
                width: "100%",
                border: "1px solid #fff",
                borderRadius: 20,
              }}
            />
            <Typography variant="h4" fontWeight="bold">
              رغوة
            </Typography>
            <Typography variant="caption">أو النجاح</Typography>
          </Box>
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#174ea6",
              borderRadius: 2,
              px: 2,
              py: 1,
              mb: 4,
            }}
          >
            <SearchIcon sx={{ color: "#fff", mr: 1 }} />
            <InputBase
              placeholder="اوقه التقييم"
              sx={{ color: "#fff", width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          {/* Menu */}
          <List>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="الحالات" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <VolunteerActivismIcon />
              </ListItemIcon>
              <ListItemText primary="التبرع الذكاء" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <LocationCityIcon />
              </ListItemIcon>
              <ListItemText primary="الفروع وأسطورك" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="الموظفون" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="التقارير" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary="الدعم" />
            </ListItem>
          </List>
        </Box>
        {/* User Info & Alert */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: "#bdbdbd", mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography fontWeight="bold">Ahnel</Typography>
              <Typography variant="caption">المدير</Typography>
            </Box>
          </Box>
          <Alert
            icon={<WarningAmberIcon fontSize="inherit" />}
            severity="warning"
            sx={{
              bgcolor: "#fffde7",
              color: "#b28704",
              borderRadius: 2,
              fontSize: 14,
              alignItems: "center",
            }}
          >
            محتمل مرزوت
          </Alert>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            التدخل
          </Typography>
          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">اليوم</Typography>
                <Typography variant="h5" fontWeight="bold">
                  154
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  الحالات لليوم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">اليوم</Typography>
                <Typography variant="h5" fontWeight="bold">
                  45,500
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  الزيارات لليوم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">اليوم</Typography>
                <Typography variant="h5" fontWeight="bold">
                  980
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  الحملات لليوم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">اليوم</Typography>
                <Typography variant="h5" fontWeight="bold">
                  7
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  المهام الذكية
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Charts and Tables */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">Line Chart</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">Bar Chart</Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">Table</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">Donut Chart</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
