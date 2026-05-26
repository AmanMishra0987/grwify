import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userImage, setUserImage] = useState(null); // base64 or Object URL of user image
  const [userImageType, setUserImageType] = useState(null); // 'custom' or 'model'
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [activeTryOnProduct, setActiveTryOnProduct] = useState(null);
  
  // Track try-on analytics locally to feed Screen 6 (Admin Dashboard)
  const [tryOnCount, setTryOnCount] = useState(124); // mock starting try-on count
  const [productTryOnStats, setProductTryOnStats] = useState({
    'p1': 48,
    'p2': 36,
    'p3': 52,
    'p4': 21,
    'p5': 15,
    'p6': 30,
    'p7': 18,
    'p8': 42,
    'p9': 28,
    'p10': 35
  });

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  const incrementTryOnStat = (productId) => {
    setTryOnCount(prev => prev + 1);
    setProductTryOnStats(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  return (
    <AppContext.Provider value={{
      selectedProducts,
      setSelectedProducts,
      toggleProductSelection,
      clearSelection,
      userImage,
      setUserImage,
      userImageType,
      setUserImageType,
      selectedModelId,
      setSelectedModelId,
      activeTryOnProduct,
      setActiveTryOnProduct,
      tryOnCount,
      productTryOnStats,
      incrementTryOnStat
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
