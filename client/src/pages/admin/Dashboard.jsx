import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// skeleton component
import DasboardSkeleton from '@/components/skeleton/admin/DasboardSkeleton';

// components
import SalesStats from '@/components/admin/dashboard/SalesStats';
import SalesPieChart from '@/components/admin/dashboard/SalesPieChart';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';

// APIs
import { getAllOrders } from '@/services/operations/adminAPIs';

const AdminDashboard = () => {

  const { orderList, isAdminOrdersLoading } = useSelector(state => state.adminOrder);

  const dispatch = useDispatch();

  const [salesData, setSalesData] = useState({
    monthlySales: 0,
    totalSales: 0,
    monthlySalesPercentageChange: 0,
    monthlyOrders: 0,
    totalOrders: 0,
    monthlyOrdersPercentageChange: 0,
  });

  const [categorySalesData, setCategorySalesData] = useState({});
  const [brandSalesData, setBrandSalesData] = useState({});

  // function to calculate percentage change of 2 data
  const calculatePercentageChange = (prev, curr) => {
    if(prev === 0)  {
      return NaN;
    }

    const change = ((curr - prev) / prev )* 100;
    return change.toFixed(2);
  }

  // calculate sales stats
  useEffect(() => {
    let allOrdersSales = 0;
    let allOrdersCount = 0;

    let prevMonthSales = 0;
    let currMonthSales = 0;
    
    let prevMonthOrders = 0;
    let currMonthOrders = 0;

    // to store category sales data
    const categorySalesDataStats = {
      'dogs': {label: 'Dogs', sales: 0, revenue: 0, fill: '#ac1637'},
      'cats': {label: 'Cats', sales: 0, revenue: 0, fill: '#d01b42'},
      'birds': {label: 'Birds', sales: 0, revenue: 0, fill: '#e42f57'},
      'fish&aquatic': {label: 'Fish & Aquatic', sales: 0, revenue: 0, fill: '#e74165'},
      'toys': {label: 'Toys', sales: 0, revenue: 0, fill: '#eb6583'},
      'grooming': {label: 'Grooming', sales: 0, revenue: 0, fill: '#f089a0'},
      'health': {label: 'Health', sales: 0, revenue: 0, fill: '#f5aebd'},
      'beds&cages': {label: 'Beds & Cages', sales: 0, revenue: 0, fill: '#fce4e9'},
    }

    // to store brand sales data
    const brandSalesDataStats = {
      'pedigree': {label: 'Pedigree', sales: 0, revenue: 0, fill: '#124ac4'},
      'whiskas': {label: 'Whiskas', sales: 0, revenue: 0, fill: '#1558ea'},
      'active': {label: 'Active', sales: 0, revenue: 0, fill: '#3b73ed'},
      'royal-canin': {label: 'Royal-Canin', sales: 0, revenue: 0, fill: '#608df0'},
      'himalaya': {label: 'Himalaya', sales: 0, revenue: 0, fill: '#86a8f4'},
      'purepet': {label: 'Purepet', sales: 0, revenue: 0, fill: '#abc3f7'},
      'others': {label: 'Others', sales: 0, revenue: 0, fill: '#d0defb'},
    }

    // iterate all orders to calculate stats
    orderList.forEach(order => {
      // check if order was last month
      const isPrevMonthOrder = new Date(order?.orderDate).getMonth() === new Date().getMonth()-1;
      // check if order of current month
      const isCurrentMonthOrder = new Date(order?.orderDate).getMonth() === new Date().getMonth();

      // calculate order count
      prevMonthOrders += isPrevMonthOrder ? order?.cartItems.length : 0;
      currMonthOrders += isCurrentMonthOrder ? order?.cartItems.length : 0;
      allOrdersCount += order?.cartItems.length;


      order?.cartItems?.forEach(item => {
        const itemPrice = Number.parseFloat(item?.price);
        // if payment was done for order
        if(order?.paymentStatus === 'paid') {
          // calculate sales amount
          prevMonthSales += isPrevMonthOrder ? itemPrice : 0;
          currMonthSales += isCurrentMonthOrder ? itemPrice : 0;
          allOrdersSales += itemPrice;

          // calculate category sales data
          
          categorySalesDataStats[item?.category].sales += 1;
          categorySalesDataStats[item?.category].revenue += itemPrice;

          // calculate brand sales data
          brandSalesDataStats[item?.brand].sales += 1;
          brandSalesDataStats[item?.brand].revenue += itemPrice;
        }
      });
    });

    // set brand & cateogry sales data
    setBrandSalesData(brandSalesDataStats);
    setCategorySalesData(categorySalesDataStats);

    // calculate monthly sales percentage change
    const monthlyOrdersPercentageChange = calculatePercentageChange(prevMonthOrders, currMonthOrders);
    const monthlySalesPercentageChange = calculatePercentageChange(prevMonthSales, currMonthSales);

    // set monthly & overall sales data
    setSalesData({
      ...salesData,
      monthlySales: currMonthSales,
      totalSales: allOrdersSales,
      monthlySalesPercentageChange: monthlySalesPercentageChange,
      monthlyOrders: currMonthOrders,
      totalOrders: allOrdersCount,
      monthlyOrdersPercentageChange: monthlyOrdersPercentageChange,
    });

  }, [orderList]);

  // fetch all orders data on first render
  useEffect(() => {
    const fetchAllOrders = async () => {
      await getAllOrders(dispatch);
    }

    fetchAllOrders();
  }, []);

  // skeleton for loader
  if(isAdminOrdersLoading) {
    return <DasboardSkeleton/>
  }

  return (
    <div>
      {/* sales stats */}
      <SalesStats salesData={salesData}/>

      {/* pie charts */}
      <section className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* sales by categories */}
        <SalesPieChart 
          heading="Category"
          data={categorySalesData}
          totalRevenue={salesData.totalSales}
          totalOrders={salesData.totalOrders} 
        />

        {/* sales by brands */}
        <SalesPieChart 
          heading="Brand"
          data={brandSalesData}
          totalRevenue={salesData.totalSales}
          totalOrders={salesData.totalOrders} 
        />
      </section>

      {/* Top 10 selling products */}
      <TopSellingProducts/>
    </div>
  )
}

export default AdminDashboard