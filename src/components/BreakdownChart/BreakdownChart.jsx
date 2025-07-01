import React from 'react'
import { Box ,Typography,useTheme } from '@mui/material'
import { useGetOverallStatQuery } from '../../redux/Slices/sales.js'
import {ResponsivePie} from '@nivo/pie'
const BreakdownChart = ({isDashboard=false}) => {
    const theme=useTheme()
    const {data,isLoading}=useGetOverallStatQuery()
    console.log("🚀 ~ BreakdownChart ~ data:", data?.data[0])

    if (!data || isLoading ) return "Loading..."
    
    const colors=[
        "#70c7ff",
        "#40d5f9",
        "#32a9c5",
        "#70bdff",
    ]
    const formattedData=Object.entries(data?.data[0].salesByCategory ).map(([category,sales],i)=>{
        return {
            id:category,
            label:category,
            value:sales,
            color:colors[i],
        }
    })

  return (
    <Box
        height={isDashboard ? "400px" : "100%"} 
        width={undefined}  
        minHeight={isDashboard ? "325px" : undefined}
        minWidth={isDashboard ? "325px" : undefined}
        position="relative"
    >
        <ResponsivePie
        data={formattedData}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: "#70bdff"
                    }
                },
                legend: {
                    text: {
                        fill: "#70bdff"
                    }
                },
                ticks: {
                    line: {
                        stroke: "#70bdff",
                        strokeWidth: 1
                    },
                    text: {
                        fill: "#70bdff"
                    }
                },
                legends: {
                    text: {
                        fill: "#70bdff"
                    }
                },
                tooltip: {
                    container: {
                        color: "#70bdff"
                    }
                }
            },
        }}
        margin={isDashboard ? { top: 40, right: 80, bottom: 100, left: 50 } 
                : { top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={colors}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: isDashboard ? 20: 0,
                translateY: isDashboard ? 50: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.primary[500]
                        }
                    }
                ]
            }
        ]}
    />
    <Box position="absolute" 
            top="50%" 
            left="50%"
            color={theme.palette.secondary[400]}
            textAlign="center"
            pointerEvents="none"
            sx={{
            transform:isDashboard ? 
            "translate(-75%,-170%)" : 
        "translate(-50%,-100%)" ,
        }} >
            <Typography  variant="h6"  sx={{color:theme.palette.secondary[200] , fontSize:"12px" }}>
                { isDashboard && "Total:"} ${data?.data[0].yearlySalesTotal.toFixed(2)}
            </Typography>
    </Box>
    </Box>
  )
}

export default BreakdownChart