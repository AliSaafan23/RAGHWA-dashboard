import React, { useMemo } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {ResponsiveLine } from '@nivo/line'
import {useGetOverallStatQuery} from '../../redux/Slices/sales.js'
const OverviewChart = ({isDashboard=false,view}) => {
  const theme = useTheme()
  const {data, isLoading} = useGetOverallStatQuery()
  console.log(data)
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
      if(!data?.data ) return []
      const {monthlyData} = data.data[0]
      const totalSalesLine = {
          id: "totalSales",
          color: theme.palette.secondary.main,
          data: [],
      }
      const totalUnitsLine = {
          id: "totalUnits",
          color: theme.palette.secondary[600],
          data: [],
      }
      Object.values(monthlyData).reduce((acc, {month, totalSales, totalUnits}) => {
          const curSales= acc.sales + totalSales
          const curUnits= acc.units + totalUnits
          totalSalesLine.data = [
              ...totalSalesLine.data,
              {x: month, y: curSales}
          ]
          totalUnitsLine.data = [
              ...totalUnitsLine.data,
              {x: month, y: curUnits}
          ]
          return {sales: curSales, units: curUnits}
      }, {sales: 0, units: 0})
      return [[totalSalesLine], [totalUnitsLine]]
  }, [data, theme])

  console.log(totalSalesLine,totalUnitsLine)
  if(!data || isLoading) return <LinearProgress />
  return (
    <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
        theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: "#ffffff"
                        }
                    },
                    legend: {
                        text: {
                            fill: "#000000"
                        }
                    },
                    ticks: {
                        line: {
                            stroke: "#000000",
                            strokeWidth: 1
                        },
                        text: {
                            fill: "#000000"
                        }
                    },
                    legends: {
                        text: {
                            fill: "#6dd3f6"
                        }
                    },
                    tooltip: {
                        container: {
                            color: "#6dd3f6"
                        }
                    }
                },
                 labels: {
                  text: {
                      fill: "#ffffff", // White color for better contrast with dark background
                      fontSize: 12,
                      fontWeight: 'bold',
                      background: 'rgba(0, 0, 0, 0.7)',
                      padding: 4,
                      borderRadius: 2
                  }
              }
        }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        colors={"#6dd3f6"}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={isDashboard}
        areaOpacity={0.08}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format:(v)=>{
                if(isDashboard){
                    return v.slice(0, 3)
                }
                return v;
            },
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? '' : "Month",
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? '' : ` Total ${view === "sales" ? "Revenue" : "Units"} per Year`,  
            legendOffset: -60,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel={function(e){return e.point.data.y}} 
        pointLabelColor={function() { return "#dcf5fc" }}
        pointLabelStrokeColor="#000000" 
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={isDashboard ?  [
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: '#dcf5fc',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]:undefined}
    />
  )
}

export default OverviewChart