'use client'
import { getProducts } from '@/redux/features/products/productsSlice';
import { BarChart3, ClipboardList, Package, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const { items } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    console.log(items,"Dashboard");
    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);
    return (
        <div className="space-y-4 lg:space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{items?.length}</p>
                  </div>
                  <Package className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">856</p>
                  </div>
                  <ClipboardList className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-green-600 mt-2">+8% from last month</p>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">2,341</p>
                  </div>
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-green-600 mt-2">+15% from last month</p>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">$45,231</p>
                  </div>
                  <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-green-600 mt-2">+23% from last month</p>
              </div>
            </div>
          </div>
    );
};

export default Dashboard;