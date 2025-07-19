import { Box } from "@mui/material";
import CategoryController from "../components/CategoryController/CategoryController";
import StorageController from "../components/StorageController/Storage";
import TabBarComponent from "../components/TabBarComponent";
import GoodFristTime from "../components/GoodsForTheFirstTime/GoodFristTime";
import Branches from "../components/BranchesController/Branches";
import Storage from "../components/StorageController/Storage";

const StorageManagement = () => {
  const tabs = [
    { label: "الفروع", value: "1" },
    { label: "المستودعات", value: "2" },
    { label: "الأصناف", value: "3" },
    { label: "رصيد اول المدة", value: "4" },
  ];

  const tabPanels = [
    { value: "1", component: <Branches /> },
    { value: "2", component: <Storage /> },
    { value: "3", component: <CategoryController /> },
    { value: "4", component: <GoodFristTime /> },
  ];
  return (
    <Box>
      <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
    </Box>
  );
};

export default StorageManagement;
