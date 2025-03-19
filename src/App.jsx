import { useState } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);  // Producto actual que se edita 
  const [isEditing, setEditing] = useState(false);  // Si estamos editando o agregando

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const editProduct = (product) => {
    setProducts(
      products.map((p) => (p.codigo === product.codigo ? product : p))
    );
    setEditing(false); // Desactivamos la edición después de editar      
  };

  const deleteProduct = (codigo) => {
    setProducts(products.filter((product) => product.codigo !== codigo));
  };

  return (
    <>
      {/* Header con el título */}
      <AppBar position="static" sx={{ backgroundColor: "#429f95" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} style={{fontSize: "20px"}}>
            Sistema para la Gestión de Productos 
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor con imagen de fondo que cubre toda la página */}
      <Box
        sx={{
          minHeight: "100vh",  // Asegura que el contenedor ocupe al menos la altura completa de la ventana
          display: "flex",
          flexDirection: "column",  // Apila los elementos verticalmente
          justifyContent: "space-between",  // Empuja el footer hacia abajo
        }}
      >
        {/* Contenedor para Agregar Producto */}
        <Container
          sx={{
            backgroundColor: "rgba(81, 81, 81, 0.2)",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
            maxWidth: "100%",
            marginBottom: "20px",  // Deja un pequeño espacio antes del siguiente contenedor
          }}
        >
          <center>
            <h1>Agregar un Producto</h1>
          </center>
          <br />
          <ProductForm
            addProduct={addProduct}
            editProduct={editProduct}
            products={products}  // Pasamos la lista de productos
            currentProduct={currentProduct}
            isEditing={isEditing}
            setEditing={setEditing}
          />
        </Container>

        {/* Contenedor para Tabla de Productos Agregados */}
        <Container
          sx={{
            backgroundColor: "rgba(81, 81, 81, 0.2)",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
            maxWidth: "100%",
            marginBottom: "20px",
          }}
        >
          <ProductList
            products={products}
            deleteProduct={deleteProduct}
            setCurrentProduct={setCurrentProduct}
            setEditing={setEditing}
          />
        </Container>

        {/* Footer con el texto */}
        <Box
          sx={{
            backgroundColor: "#115c63",
            color: "white",
            textAlign: "center",
            padding: "10px 0",
            position: "relative",  // Cambié 'fixed' a 'relative' para que se ajuste al final sin solaparse
            bottom: 0,
            width: "100%",  // Asegura que el footer ocupe el ancho completo de la página
          }}
        >
          <Typography variant="body2" style={{ marginBottom: "1%", fontSize: "20px" }}>
            © 2025 - Todos los derechos reservados
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default App;