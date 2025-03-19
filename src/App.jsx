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
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} style={{fontSize: "35px"}}>
            Sistema para la Gestión de Productos
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor con imagen de fondo que cubre toda la página */}
      <Box
        sx={{
          minHeight: "10vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "20px", // Asegura que no esté pegado al header 
          paddingBottom: "30px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Contenedor para Agregar Producto */}
        <Container
          sx={{
            backgroundColor: "rgba(81, 81, 81, 0.2)", // Fondo semitransparente para el contenedor Agregar Producto
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
            maxWidth: "100%", // El contenedor ocupa el 100% del ancho
            marginBottom: "20px", // Agrega un margen en la parte inferior
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
            backgroundColor: "rgba(81, 81, 81, 0.2)", // Fondo semitransparente para el contenedor de Tabla
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
            maxWidth: "100%", // El contenedor ocupa el 100% del ancho 
            marginBottom: "20px", // Agrega un margen en la parte inferior 
          }}
        >
          <ProductList
            products={products}
            deleteProduct={deleteProduct}
            setCurrentProduct={setCurrentProduct}
            setEditing={setEditing}
          />
        </Container>
        <br />

        {/* Footer con el texto */}
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            textAlign: "center",
            padding: "10px 0",
            position: "fixed",
            bottom: 0,
            width: "99.1%",
          }}
        >
          <Typography variant="body2" style={{marginBottom: "1%", fontSize: "20px"}}>
            © 2025 - Todos los derechos reservados
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default App;