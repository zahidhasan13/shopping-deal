"use client";

import { getUsers, removeUsers } from "@/redux/features/user/userSlice";
import { Edit, Eye, Package, ShoppingBag, Trash2, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AllUser = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  console.log(users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUserDelete = (id) => {
    console.log("click", id);
    dispatch(removeUsers(id));
  };

  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No user Found!
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any user yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Users List
        </h2>

        {/* 📱 Mobile View */}
        <div className="block lg:hidden">
          {users.map((user) => (
            <div key={user?._id} className="p-4 border-b last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-12 w-12">
                  <Avatar className="border-2 border-white dark:border-gray-800">
                    <AvatarImage
                      src={user?.image || "https://github.com/shadcn.png"}
                      alt={`${user?.name || "User"}'s avatar`}
                      onError={(e) => {
                        e.currentTarget.src = "https://github.com/shadcn.png";
                      }}
                    />
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "CN"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 truncate max-w-[6rem]">
                        {user?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleUserDelete(user?._id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💻 Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Avatar className="border-2 border-white dark:border-gray-800">
                          <AvatarImage
                            src={user?.image || "https://github.com/shadcn.png"}
                            alt={`${user?.name || "User"}'s avatar`}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://github.com/shadcn.png";
                            }}
                          />
                          <AvatarFallback>
                            {user?.name
                              ? user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "CN"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleUserDelete(user?._id)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUser;
