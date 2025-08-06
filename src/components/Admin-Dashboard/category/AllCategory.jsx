import { getCategory, removeCategory } from '@/redux/features/category/categorySlice';
import { Edit, Eye, LayoutGrid, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AllCategory = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    console.log(categories);

    useEffect(() => {
        dispatch(getCategory());
      }, [dispatch]);

      const handleCategoryDelete = (id) => {
          dispatch(removeCategory(id))
        }


    if (!categories || categories?.length === 0) {
    return (
      <div className="min-h-screen">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center py-16">
                  <LayoutGrid className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Category Found!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Looks like you haven't added any category yet.
                  </p>
                </div>
              </div>
            </div>
    )
  }
    return (
        <div className="space-y-4 lg:space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
        Category List
      </h2>

      {/* 📱 Mobile View */}
      <div className="block lg:hidden">
        {categories.map((category) => (
          <div key={category?._id} className="p-4 border-b last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-12 w-12">
                {category?.image ? (
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate max-w-[6rem]">
                      {category?.name}
                    </h3>
                    <p className="text-xs text-gray-500">SKU: {category?.slug}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={()=>handleCategoryDelete(category?._id)} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {category?.image ? (
                        <img
                          src={category?.image}
                          alt={category?.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <LayoutGrid className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category?.slug}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900 cursor-pointer">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={()=>handleCategoryDelete(category?._id)} className="text-red-600 hover:text-red-900 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default AllCategory;