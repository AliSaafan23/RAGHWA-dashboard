import { Box } from "@mui/material";
import CategoryController from "../components/CategoryController/CategoryController";
import StorageController from "../components/StorageController/StorageController";
import TabBarComponent from "../components/TabBarComponent";
import GoodFristTime from "../components/GoodsForTheFirstTime/GoodFristTime";

const StorageManagement = () => {
  const tabs = [
    { label: "المستودعات", value: "1" },
    { label: "الأصناف", value: "2" },
    { label: "رصيد اول المدة", value: "3" },
  ];

  const tabPanels = [
    { value: "1", component: <StorageController /> },
    { value: "2", component: <CategoryController /> },
    { value: "3", component: <GoodFristTime /> },
  ];
  return (
    <Box>
      <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
    </Box>
  );
};

export default StorageManagement;
