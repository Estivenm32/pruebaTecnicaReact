import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";

export const ProductForm = ({ addProduct, editProduct, currentProduct, isEditing, setEditing, products }) => {
  // Los estados estarán vacíos inicialmente para el formulario de agregar
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [creacion, setCreacion] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Estado para el modal de advertencia

  useEffect(() => {
    if (isEditing && currentProduct) {
      // Solo si estamos editando, llenar los campos con los datos del producto seleccionado
      setCodigo(currentProduct.codigo);
      setNombre(currentProduct.nombre);
      setDescripcion(currentProduct.descripcion);
      setCantidad(currentProduct.cantidad);
      setCreacion(new Date(currentProduct.creacion).toISOString().split('T')[0]); // Convierte la fecha a YYYY-MM-DD
    } else {
      // Si no estamos editando, limpiamos los campos
      setCodigo("");
      setNombre("");
      setDescripcion("");
      setCantidad("");
      setCreacion("");
    }
  }, [currentProduct, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Verificar si el código ya existe en la lista de productos     
    const existingProduct = products.find(
      (product) => product.codigo === Number(codigo) && (!isEditing || product.codigo !== currentProduct?.codigo)
    );
  
    if (existingProduct) {
      setOpenDialog(true); // Si existe, abrir el modal de advertencia
      return;
    }
  
    const newProduct = {
      codigo: Number(codigo),
      nombre,
      descripcion,
      cantidad: Number(cantidad),
      creacion: new Date(creacion),
    };
  
    if (isEditing) {
      editProduct(newProduct); // Edita el producto existente
    } else {
      addProduct(newProduct); // Agrega un nuevo producto
    }
  
    // Después de agregar o editar, cerramos el modal y limpiamos los campos
    setCodigo("");
    setNombre("");
    setDescripcion("");
    setCantidad("");
    setCreacion("");
    setEditing(false); // Cierra el modal después de la edición
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Cierra el modal de advertencia
  };

  const handleClose = () => {
    setEditing(false); // Cierra el modal sin hacer cambios
  };

  return (
    <>
      {/* Formulario para agregar un producto */}
      {!isEditing && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código"
                variant="outlined"
                fullWidth
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cantidad"
                variant="outlined"
                fullWidth
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de Creación"
                variant="outlined"
                fullWidth
                type="date"
                value={creacion}
                onChange={(e) => setCreacion(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Agregar Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {/* Modal para editar un producto */}
      <Dialog open={isEditing} onClose={handleClose} aria-labelledby="edit-product-dialog">
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700' }}>Editar Producto</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ paddingTop: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Código"
                  variant="outlined"
                  fullWidth
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                  disabled={true} // Deshabilita el campo código en el modal de edición
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cantidad"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Creación"
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={creacion}
                  onChange={(e) => setCreacion(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Editar Producto
                </Button>
                <Button
                  onClick={handleClose}
                  style={{ backgroundColor: '#f44336', color: 'white', top: '10px' }} // Rojo para el botón Cerrar
                  fullWidth
                >
                  Cerrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions />
      </Dialog>

      {/* Modal de advertencia por código duplicado */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ color: 'red' }}>Error</DialogTitle>
        <DialogContent style={{ fontSize: '20px' }}>
          Ya existe un producto agregado con ese mismo código. Por favor, ingresa un nuevo código.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" fullWidth>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};