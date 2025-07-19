import React from "react";
import { Box } from "@mui/material";
import TabBarComponent from "../components/TabBarComponent";
import RegistratoionOfItem from "../components/RegistrationOfItem/RegistrationOfItem";

export default function RegistratoionOfItemManagement() {
  const tabs = [{ label: "انشاء صنف جديد", value: "1" }];

  const tabPanels = [{ value: "1", component: <RegistratoionOfItem /> }];
  return (
    <Box>
      <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
    </Box>
  );
}
