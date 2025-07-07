import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import PurchaseOrders from "../components/PurchaseOrdersComponents/PurchaseOrders";
import TabBarComponent from "../components/TabBarComponent";

export default function Purchase() {
  const tabs = [
    { label: " امر الشراء الرئيسية ", value: "1" },
    { label: "  استلام مشتريات ", value: "2" },
  ];
  const tabPanels = [{ value: "1", component: <PurchaseOrders /> }];
  return (
    <Box>
      <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
    </Box>
  );
}
