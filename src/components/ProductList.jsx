import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, TablePagination, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import React, { useState } from "react";

export const ProductList = ({ products, deleteProduct, setCurrentProduct, setEditing }) => {
  const [page, setPage] = useState(0); // Página actual 
  const [rowsPerPage, setRowsPerPage] = useState(5); // Productos por página  
  const [sortBy, setSortBy] = useState("codigo"); // Criterio de ordenación (código, nombre, cantidad, fecha)
  const [sortOrder, setSortOrder] = useState("asc"); // Orden (ascendente o descendente)

  // Estado para manejar el modal de confirmación
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); // Producto a eliminar

  // Maneja el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Maneja el cambio de cantidad de productos por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Resetear a la primera página
  };

  // Maneja el cambio del criterio de ordenación
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Maneja el cambio del orden de la ordenación (ascendente o descendente)
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Función para ordenar los productos
  const sortedProducts = [...products].sort((a, b) => {
    let compareA = a[sortBy];
    let compareB = b[sortBy];

    if (sortBy === "creacion") {
      compareA = new Date(a[sortBy]);
      compareB = new Date(b[sortBy]);
    }

    if (sortOrder === "asc") {
      return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
    } else {
      return compareA > compareB ? -1 : compareA < compareB ? 1 : 0;
    }
  });

  // Productos a mostrar en la página actual
  const currentProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Función para abrir el modal de confirmación de eliminación
  const handleOpenConfirmDialog = (product) => {
    setProductToDelete(product);
    setOpenConfirmDialog(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setProductToDelete(null);
  };

  // Función para eliminar el producto
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.codigo);
    }
    handleCloseConfirmDialog(); // Cierra el modal después de eliminar
  };

  return (
    <>
      <center><h1>Tabla de productos Agregados</h1></center>
      <br />

      {/* Filtros para ordenar */}
      <FormControl sx={{ minWidth: 120, marginBottom: "20px", marginRight: "20px" }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          label="Ordenar por"
        >
          <MenuItem value="codigo">Código</MenuItem>
          <MenuItem value="nombre">Nombre</MenuItem>
          <MenuItem value="cantidad">Cantidad</MenuItem>
          <MenuItem value="creacion">Fecha de Creación</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginBottom: "20px" }}>
        <InputLabel>Orden</InputLabel>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          label="Orden"
        >
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor: "#c4d0e1"}}>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.codigo}>
                <TableCell>{product.codigo}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.descripcion}</TableCell>
                <TableCell>{product.cantidad}</TableCell>
                <TableCell>{new Date(product.creacion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    onClick={() => handleOpenConfirmDialog(product)} // Abrir el modal para confirmar eliminación
                    style={{ color: '#f44336' }} >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setCurrentProduct(product);
                      setEditing(true);  // Activamos el modal de edición     
                    }}
                    style={{ color: '#1976d2' }} 
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{backgroundColor: "white"}}
      />
 
      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle>¿Estás seguro que deseas eliminar este producto?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};