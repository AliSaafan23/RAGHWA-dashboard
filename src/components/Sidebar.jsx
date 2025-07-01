import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  InputBase,
  Alert,
  Collapse,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
const drawerWidth = 250;

const menuItems = [
  {
    id: "Customer",
    text: "ادارة العملاء",
    icon: <PeopleIcon />,
    settings: ["عرض", "تعديل الإعدادات", "إيقاف"],
  },
  {
    id: "Subscriptions",
    text: "اداره الاشتراكات ",
    icon: <SubscriptionsIcon />,
    settings: ["عرض الفروع", "إضافة فرع", "حذف فرع"],
  },
  {
    id: "Supplier ",
    text: "اداره الموردين",
    icon: <BusinessIcon />,
    settings: ["عرض القائمة", "إضافة موظف", "تعديل", "حذف"],
  },
  {
    id: "Warehouses",
    text: "اداره المخازن",
    icon: <InventoryIcon />,
    settings: ["عرض التقرير", "تصدير", "حذف"],
  },
  {
    id: "Procurement",
    text: "اداره المشتريات ",
    icon: <ShoppingCartIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Vehicle",
    text: "اداراه المركبات",
    icon: <DirectionsCarIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Service",
    text: "ادارة الخدمات",
    icon: <MiscellaneousServicesIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Sales",
    text: "اداره المبيعات",
    icon: <PointOfSaleIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Evaluation",
    text: "ادارة التقييم و المتابعه",
    icon: <AssessmentIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "HR",
    text: "اداره الموارد البشريه",
    icon: <WorkIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Accounts",
    text: "اداره الحسابات",
    icon: <AccountBalanceIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Fixed",
    text: "اداره الاصول الثابته",
    icon: <HomeRepairServiceIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Reporting",
    text: "التقارير",
    icon: <BarChartIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
  {
    id: "Administration",
    text: "اعدادات النظام",
    icon: <SettingsIcon />,
    settings: ["فتح تذكرة", "عرض التذاكر", "إغلاق"],
  },
];

function Sidebar() {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleSettingClick = (action, itemId) => {
    console.log(`${action} clicked for item: ${itemId}`);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#0a3a7e",
          // Removed scrollbarColor and related webkit styles from here
          borderColor: "#0a3a7e",
          color: "#fff",
          borderRadius: "16px",
          m: 2,
          p: 3,
          pb: 5,
          display: "flex",
          flexDirection: "column",
          // Removed justifyContent: "space-between"
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          // Removed marginBottom: 10
          overflowX: "hidden", // Hide horizontal scrollbar
          overflowY: "auto", // Allow vertical scrolling
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE/Edge
          "&::-webkit-scrollbar": {
            // For Chrome, Safari, Opera
            display: "none",
            width: 0,
          },
        },
        // Removed these redundant scrollbar styles from the main Drawer sx prop
        // "&::-webkit-scrollbar": {
        //   backgroundColor: "#6491cf",
        //   width: "8px",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   backgroundColor: " #0a3a7e",
        // },
      }}
    >
      {/* This Box will now be the main scrollable area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE/Edge
          "&::-webkit-scrollbar": {
            // For Chrome, Safari, Opera
            display: "none",
            width: 0,
          },
        }}
      >
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: "80%",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          />
        </Box>

        {/* Removed maxHeight and overflow properties from List, parent Box handles it */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <Box key={item.id} sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.id)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                  bgcolor:
                    expandedItem === item.id
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  pr: 2, // Add right padding
                  pl: 1, // Reduce left padding
                  justifyContent: "flex-end", // Align content to the right
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: "bold",
                      fontSize: "14px",
                      fontFamily: "Cairo, sans-serif",
                      textAlign: "right", // Right align text
                    },
                    textAlign: "right", // Ensure text alignment
                    margin: 0,
                  }}
                />
                {expandedItem === item.id ? (
                  <ExpandLessIcon sx={{ color: "#fff", ml: 1 }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#fff", ml: 1 }} />
                )}

                {/* Icon moved to the end and hidden with display: none */}
              </ListItemButton>
              <Collapse
                in={expandedItem === item.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.settings.map((setting, index) => (
                    <ListItemButton
                      key={`${item.id}-${index}`}
                      onClick={() => handleSettingClick(setting, item.id)}
                      sx={{
                        pl: 2, // Reduce left padding
                        pr: 6, // Add right padding for indentation
                        py: 0.75,
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                        },
                        justifyContent: "flex-end", // Align content to the right
                      }}
                    >
                      <ListItemText
                        primary={setting}
                        primaryTypographyProps={{
                          fontSize: 12,
                          fontWeight: "bold",
                          textAlign: "right", // Right align text
                        }}
                      />
                      <ListItemIcon
                        sx={{
                          color: "#fff",
                          minWidth: 30,
                          display: "none", // Hide the icon
                        }}
                      >
                        <ChevronLeftIcon fontSize="small" />
                      </ListItemIcon>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 2,
              p: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: "#2c5aa0",
                  ml: 2, // Change from mr to ml
                  mr: 0, // Remove right margin
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                <Typography fontWeight="bold">ابو زياد</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  المدير
                </Typography>
              </Box>
            </Box>
          </Box>
          <Alert
            icon={<WarningAmberIcon fontSize="inherit" />}
            severity="warning"
            sx={{
              bgcolor: "rgba(255, 236, 179, 0.9)",
              color: "#b28704",
              borderRadius: 3,
              fontSize: 14,
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "right", // Right align text
            }}
          >
            محتمل مرزوت
          </Alert>
        </Box>
      </Box>
      {/* This Box will remain fixed at the bottom */}
    </Drawer>
  );
}

export default Sidebar;
