import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  </Router>
);

export default AppRoutes;
