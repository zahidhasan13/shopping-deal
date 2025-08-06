'use client'
import React, { useEffect, useState } from 'react';
import { 
  Package, 
  Image, 
  ClipboardList, 
  Users, 
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  LayoutGrid
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import AllProduct from '@/components/Admin-Dashboard/product/AllProduct';
import AddProduct from '@/components/Admin-Dashboard/product/AddProduct';
import Dashboard from '@/components/Admin-Dashboard/dashboard/Dashboard';
import { useRouter } from 'next/navigation';
import AllCategory from '@/components/Admin-Dashboard/category/AllCategory';
import AddCategory from '@/components/Admin-Dashboard/category/AddCategory';
import AllUser from '@/components/Admin-Dashboard/user/AllUser';

const AdminDashboard = () => {

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      type: 'single'
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      type: 'accordion',
      children: [
        { id: 'product-list', label: 'All Products' },
        { id: 'product-add', label: 'Add Product' }
      ]
    },
    {
      id: 'category',
      label: 'Category',
      icon: LayoutGrid,
      type: 'accordion',
      children: [
        { id: 'category-list', label: 'All Category' },
        { id: 'category-add', label: 'Add Category' }
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ClipboardList,
      type: 'accordion',
      children: [
        { id: 'order-list', label: 'All Orders' },
        { id: 'order-pending', label: 'Pending Orders' },
        { id: 'order-completed', label: 'Completed Orders' }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      type: 'accordion',
      children: [
        { id: 'user-list', label: 'All Users' }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      icon: Image,
      type: 'accordion',
      children: [
        { id: 'slider', label: 'Slider Management' },
        { id: 'cart-settings', label: 'Cart Settings' },
        { id: 'banners', label: 'Banners' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      type: 'single'
    }
  ];

  const renderSidebarItem = (item) => {
  if (item.type === "single") {
    return (
      <button
        key={item.id}
        onClick={() => {
          setActiveSection(item.id);
          closeSidebar();
        }}
        className={`w-full flex items-center px-3 lg:px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
          activeSection === item.id
            ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
            : "text-gray-700"
        }`}
      >
        <item.icon className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 flex-shrink-0" />
        <span className="text-sm lg:text-base">{item.label}</span>
      </button>
    );
  }

  return (
    <Accordion type="single" collapsible key={item.id} className="border-b border-gray-200">
      <AccordionItem value={item.id}>
        <AccordionTrigger className="px-3 lg:px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors text-gray-700">
          <div className="flex items-center">
            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 flex-shrink-0" />
            <span className="text-sm lg:text-base">{item.label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-gray-50">
          {item.children.map((child) => (
            <button
              key={child.id}
              onClick={() => {
                setActiveSection(child.id);
                closeSidebar();
              }}
              className={`w-full text-left px-6 lg:px-8 py-2 hover:bg-gray-100 transition-colors text-sm lg:text-base ${
                activeSection === child.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {child.label}
            </button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard/>
        );

        case 'product-list':
            return(
                <AllProduct/>
            );
        case 'product-add':
            return(
                <AddProduct/>
            );
        case 'category-list':
            return(
                <AllCategory/>
            );
        case 'category-add':
            return(
                <AddCategory/>
            );
        case 'user-list':
            return(
                <AllUser/>
            );

      case 'slider':
        return (
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Slider Management</h1>
              <button className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm lg:text-base w-full sm:w-auto justify-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <Image className="w-8 h-8 lg:w-12 lg:h-12 text-white opacity-50" />
                  </div>
                  <div className="p-3 lg:p-4">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Slide {item}</h3>
                    <p className="text-gray-600 text-sm mb-3 lg:mb-4">Sample slide description for slider {item}.</p>
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Active</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
            <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Settings className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm lg:text-base">
                  Content for {activeSection.replace('-', ' ')} section will be displayed here.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-30">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-gray-800">Shopping Deal</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:justify-center">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">Shopping Deal</h2>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-4 h-[calc(100vh-5rem)] overflow-y-auto">
          {sidebarItems.map(renderSidebarItem)}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;