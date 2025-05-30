import React from 'react'

// charts
import { Label, Pie, PieChart } from 'recharts'

// shadcn ui components
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const SalesPieChart = ({heading, data, totalRevenue, totalOrders}) => {

  // data for chart
  const chartData = [];
  const chartConfig = {};

  // create chart data & config
  for(const keyItem in data) {
    chartData.push({
      category: keyItem,
      sales: data[keyItem].sales,
      revenue: data[keyItem].revenue,
      fill: data[keyItem].fill,
    });
    
    chartConfig[keyItem] = {
      label: data[keyItem].label,
      color: data[keyItem].fill,
    }
  }

  return (
    <div className='mt-8 outline rounded-lg p-4'>
      {/* heading */}
      <h2 className='mt-3 text-2xl font-bold text-center'>
        Sales by {heading}
      </h2>

      {/* pie charts */}
      <div className='mt-8 flex flex-col sm:flex-row justify-evenly gap-6'>
        {/* sales count for each category */}
        <div className='p-6 outline rounded-md'>
          <ChartContainer 
            config={chartConfig} 
            className='mx-auto aspect-square max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="sales"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalOrders.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total items
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />

              </Pie>
            </PieChart>
          </ChartContainer>
          
          <p className='text-center text-muted-foreground'>
            Showing total orders sales for each {heading?.toLowerCase()}
          </p>
        </div>

        {/* revenue for each category */}
        <div className='p-6 outline rounded-md'>
          <ChartContainer 
            config={chartConfig} 
            className='mx-auto aspect-square max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="revenue"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            ₹{totalRevenue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total revenue
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />

              </Pie>
            </PieChart>
          </ChartContainer>
          
          <p className='text-center text-muted-foreground'>
            Showing total revenue for each {heading?.toLowerCase()}
          </p>
        </div>

      </div>
    </div>
  )
}

export default SalesPieChart