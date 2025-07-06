import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import PurchaseOrders from "../components/PurchaseOrdersComponents/PurchaseOrders";

export default function Purchase() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Inventory Tabs">
            <Tab label="امر الشراء الرئيسية" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PurchaseOrders />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
