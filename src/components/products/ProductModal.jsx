// import React, { useState, useEffect } from 'react';
// import { X, Package, DollarSign, Tag, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
// import { dataService } from '../../services/dataService';
// import toast from 'react-hot-toast';

// const ProductModal = ({ product, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: '',
//     price: '',
//     is_active: true
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         description: product.description || '',
//         category: product.category || '',
//         price: product.price || '',
//         is_active: product.is_active !== undefined ? product.is_active : true
//       });
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const submitData = {
//         ...formData,
//         price: parseFloat(formData.price)
//       };

//       if (product) {
//         await dataService.updateProduct(product.id, submitData);
//         toast.success('Product updated successfully');
//       } else {
//         await dataService.createProduct(submitData);
//         toast.success('Product created successfully');
//       }
//       onSave();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       toast.error('Failed to save product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {product ? 'Edit Product' : 'Add New Product'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Package className="h-4 w-4 inline mr-1" />
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter product name..."
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Tag className="h-4 w-4 inline mr-1" />
//               Category
//             </label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., Antibiotics, Pain Relief, Vitamins..."
//               required
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <DollarSign className="h-4 w-4 inline mr-1" />
//               Price
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="0.00"
//               step="0.01"
//               min="0"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FileText className="h-4 w-4 inline mr-1" />
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               rows="4"
//               placeholder="Enter product description, usage, benefits..."
//               required
//             />
//           </div>

//           {/* Active Status */}
//           <div>
//             <label className="flex items-center space-x-3 cursor-pointer">
//               <span className="text-sm font-medium text-gray-700">
//                 Product Status
//               </span>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name="is_active"
//                   checked={formData.is_active}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className="flex items-center">
//                   {formData.is_active ? (
//                     <ToggleRight className="h-6 w-6 text-green-600" />
//                   ) : (
//                     <ToggleLeft className="h-6 w-6 text-gray-400" />
//                   )}
//                   <span className={`ml-2 text-sm ${
//                     formData.is_active ? 'text-green-600' : 'text-gray-500'
//                   }`}>
//                     {formData.is_active ? 'Active' : 'Inactive'}
//                   </span>
//                 </div>
//               </div>
//             </label>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;


import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, Tag, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { dataService } from '../../services/dataService';
import toast from 'react-hot-toast';

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || '',
        is_active: product.is_active !== undefined ? product.is_active : true
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (product) {
        await dataService.updateProduct(product.id, submitData);
        toast.success('Product updated successfully');
      } else {
        await dataService.createProduct(submitData);
        toast.success('Product created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="h-4 w-4 inline mr-1" />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 inline mr-1" />
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Antibiotics, Pain Relief, Vitamins..."
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter product description, usage, benefits..."
              required
            />
          </div>

          {/* Active Status */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">
                Product Status
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center">
                  {formData.is_active ? (
                    <ToggleRight className="h-6 w-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                  <span className={`ml-2 text-sm ${
                    formData.is_active ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;