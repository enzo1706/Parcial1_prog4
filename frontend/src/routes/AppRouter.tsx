import { Routes, Route } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import CategoriasPage from "../pages/CategoriasPage";
import IngredientesPage from "../pages/IngredientesPage";
import ProductoDetallePage from "../pages/ProductoDetallePage";
import Layout from "../components/Layout";

export default function AppRouter() {
return (
    <Layout>
    <Routes>
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos/:id" element={<ProductoDetallePage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/ingredientes" element={<IngredientesPage />} />
    </Routes>
    </Layout>
);
}