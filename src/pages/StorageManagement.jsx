import { Box } from "@mui/material";
import CategoryController from "../components/CategoryController/CategoryController";
import StorageController from "../components/StorageController/StorageController";
import TabBarComponent from "../components/TabBarComponent";

const StorageManagement = () => {
    const tabs = [
        { label: 'المستودعات', value: "1" },
        { label: 'الأصناف', value: "2" },
    ];

    const tabPanels = [
        { value: "1", component: <StorageController /> },
        { value: "2", component: <CategoryController /> },
    ];
    return (
        <Box>
            <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
        </Box>
            
    )
}

export default StorageManagement