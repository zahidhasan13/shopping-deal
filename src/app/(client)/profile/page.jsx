"use client";
import React, { useState } from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  Heart,
  Bell,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Star,
  ShoppingBag,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signOut, useSession } from "next-auth/react";
import useSingleUser from "@/hooks/useSingleUser";
import moment from "moment";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSingleUser();
  console.log(user, "user");

  const [profile, setProfile] = useState({
    name: "Emma Rodriguez",
    email: "emma.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    memberSince: "March 2023",
    totalOrders: 24,
    totalSpent: 2845.99,
    loyaltyPoints: 1250,
    addresses: [
      {
        id: 1,
        type: "Home",
        name: "Emma Rodriguez",
        street: "123 Oak Street",
        city: "San Francisco",
        state: "CA",
        zip: "94102",
        isDefault: true,
      },
      {
        id: 2,
        type: "Work",
        name: "Emma Rodriguez",
        street: "456 Market Street, Suite 200",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: "Visa",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "2025",
        isDefault: true,
      },
      {
        id: 2,
        type: "Mastercard",
        last4: "8888",
        expiryMonth: "08",
        expiryYear: "2026",
        isDefault: false,
      },
    ],
    orders: [
      {
        id: "ORD-2024-001",
        date: "2024-07-28",
        status: "delivered",
        total: 129.99,
        items: 3,
        trackingNumber: "TN123456789",
      },
      {
        id: "ORD-2024-002",
        date: "2024-07-25",
        status: "shipped",
        total: 89.5,
        items: 2,
        trackingNumber: "TN987654321",
      },
      {
        id: "ORD-2024-003",
        date: "2024-07-20",
        status: "processing",
        total: 199.99,
        items: 1,
        trackingNumber: null,
      },
    ],
    wishlist: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 159.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        inStock: true,
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        inStock: false,
      },
    ],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={16} />;
      case "shipped":
        return <Truck className="text-blue-500" size={16} />;
      case "processing":
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <RefreshCw className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "orders", label: "Orders", icon: Package },
    { id: "payments", label: "Payment Methods", icon: CreditCard }
  ];

  const renderPersonalInfo = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 h-96">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Personal Information
      </h3>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold">Full Name</h3>
          <h3>{user?.name}</h3>
        </div>
        <div>
          <h3 className="text-sm font-bold">Email</h3>
          <h3>{user?.email}</h3>
        </div>
        <div>
          <h3 className="text-sm font-bold">Contact Number</h3>
          <h3>{user?.address?.contactNumber || "N/A"}</h3>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Order History
      </h3>
      <div className="space-y-4">
        {profile.orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {order.items} items • ${order.total}
                </p>
                {order.trackingNumber && (
                  <p className="text-sm text-blue-600">
                    Tracking: {order.trackingNumber}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  <Eye size={14} />
                  <span>View</span>
                </button>
                {order.status === "delivered" && (
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                    <RefreshCw size={14} />
                    <span>Reorder</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Shipping Addresses
        </h3>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          <span>Add Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Edit2 size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="text-gray-700">
              <p className="font-medium">{address.name}</p>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          <span>Add Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <CreditCard className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {method.type} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Edit2 size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {method.isDefault && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                Default Payment Method
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "orders":
        return renderOrders();
      case "addresses":
        return renderAddresses();
      case "payments":
        return renderPayments();
      case "wishlist":
        return renderWishlist();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-mono">
      <div className="max-w-7xl mx-auto">
        {showAlert && (
          <div className="mb-6">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Profile updated successfully!
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side: profile image and info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
              <Image
                src={user?.image}
                alt="Profile"
                width={100}
                height={100}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg mx-auto sm:mx-0"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Member since {moment(user?.createdAt).format("MMM YYYY")}
                </p>
              </div>
            </div>

            {/* Right side: edit button */}
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 
                   bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded 
                   font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 
                   transition-all shadow-md hover:shadow-lg font-mono text-xs sm:text-sm"
              >
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                <button onClick={()=>signOut()} className="w-full flex items-center space-x-3 px-3 py-2 rounded text-left transition-colors cursor-pointer text-red-500 hover:bg-red-100">
                  <LogOut size={18}/>
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
