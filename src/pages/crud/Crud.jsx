import React, { useState } from "react";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack
} from "@mui/material";

export default function Crud() {

  const [value, setValue] = useState(0);

  // PRODUCTOS
  const [productos, setProductos] = useState([]);

  // ALTAS
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  // CONSULTAS
  const [buscar, setBuscar] = useState("");

  // ACTUALIZAR
  const [idActualizar, setIdActualizar] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");

  // ELIMINAR
  const [idEliminar, setIdEliminar] = useState("");

  // TABS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // AGREGAR
  const agregarProducto = () => {

    if (
      nombre === "" ||
      precio === "" ||
      cantidad === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio,
      cantidad
    };

    setProductos([...productos, nuevoProducto]);

    setNombre("");
    setPrecio("");
    setCantidad("");

    alert("Producto agregado correctamente");
  };

  // ACTUALIZAR
  const actualizarProducto = () => {

    const productosActualizados =
      productos.map((producto) => {

        if (
          producto.id === Number(idActualizar)
        ) {

          return {
            ...producto,
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            cantidad: nuevaCantidad
          };
        }

        return producto;
      });

    setProductos(productosActualizados);

    setIdActualizar("");
    setNuevoNombre("");
    setNuevoPrecio("");
    setNuevaCantidad("");

    alert("Producto actualizado");
  };

  // ELIMINAR
  const eliminarProducto = () => {

    const nuevosProductos =
      productos.filter(
        (producto) =>
          producto.id !== Number(idEliminar)
      );

    setProductos(nuevosProductos);

    setIdEliminar("");

    alert("Producto eliminado");
  };

  // FILTRO CONSULTAS
  const productosFiltrados =
    productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(buscar.toLowerCase())
    );

  return (

    <Box sx={{ p: 4 }}>

      {/* TITULO */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        CRUD - Programación Web
      </Typography>

      {/* CONTENEDOR */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 4
        }}
      >

        {/* TABS */}
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Altas" />
          <Tab label="Consultas" />
          <Tab label="Actualizaciones" />
          <Tab label="Eliminación" />
        </Tabs>

        {/* ALTAS */}
        {value === 0 && (

          <Box sx={{ mt: 4 }}>

            <Typography
              variant="h5"
              mb={3}
            >
              Alta de Productos
            </Typography>

            <Stack spacing={2}>

              <TextField
                label="Nombre del Producto"
                fullWidth
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
              />

              <TextField
                label="Precio"
                fullWidth
                value={precio}
                onChange={(e) =>
                  setPrecio(e.target.value)
                }
              />

              <TextField
                label="Cantidad"
                fullWidth
                value={cantidad}
                onChange={(e) =>
                  setCantidad(e.target.value)
                }
              />

              <Button
                variant="contained"
                size="large"
                onClick={agregarProducto}
              >
                Guardar Producto
              </Button>

            </Stack>

          </Box>

        )}

        {/* CONSULTAS */}
        {value === 1 && (

          <Box sx={{ mt: 4 }}>

            <Typography
              variant="h5"
              mb={3}
            >
              Consulta de Productos
            </Typography>

            <TextField
              fullWidth
              label="Buscar Producto"
              value={buscar}
              onChange={(e) =>
                setBuscar(e.target.value)
              }
            />

            <TableContainer
              component={Paper}
              sx={{ mt: 4 }}
            >

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {productosFiltrados.map(
                    (producto) => (

                    <TableRow
                      key={producto.id}
                    >

                      <TableCell>
                        {producto.id}
                      </TableCell>

                      <TableCell>
                        {producto.nombre}
                      </TableCell>

                      <TableCell>
                        ${producto.precio}
                      </TableCell>

                      <TableCell>
                        {producto.cantidad}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Box>

        )}

        {/* ACTUALIZACIONES */}
        {value === 2 && (

          <Box sx={{ mt: 4 }}>

            <Typography
              variant="h5"
              mb={3}
            >
              Actualizar Productos
            </Typography>

            <Stack spacing={2}>

              <TextField
                label="ID Producto"
                fullWidth
                value={idActualizar}
                onChange={(e) =>
                  setIdActualizar(e.target.value)
                }
              />

              <TextField
                label="Nuevo Nombre"
                fullWidth
                value={nuevoNombre}
                onChange={(e) =>
                  setNuevoNombre(e.target.value)
                }
              />

              <TextField
                label="Nuevo Precio"
                fullWidth
                value={nuevoPrecio}
                onChange={(e) =>
                  setNuevoPrecio(e.target.value)
                }
              />

              <TextField
                label="Nueva Cantidad"
                fullWidth
                value={nuevaCantidad}
                onChange={(e) =>
                  setNuevaCantidad(e.target.value)
                }
              />

              <Button
                variant="contained"
                size="large"
                onClick={actualizarProducto}
              >
                Actualizar Producto
              </Button>

            </Stack>

          </Box>

        )}

        {/* ELIMINACION */}
        {value === 3 && (

          <Box sx={{ mt: 4 }}>

            <Typography
              variant="h5"
              mb={3}
            >
              Eliminar Productos
            </Typography>

            <TextField
              fullWidth
              label="ID Producto"
              value={idEliminar}
              onChange={(e) =>
                setIdEliminar(e.target.value)
              }
            />

            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{ mt: 3 }}
              onClick={eliminarProducto}
            >
              Eliminar Producto
            </Button>

            <TableContainer
              component={Paper}
              sx={{ mt: 4 }}
            >

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {productos.map((producto) => (

                    <TableRow
                      key={producto.id}
                    >

                      <TableCell>
                        {producto.id}
                      </TableCell>

                      <TableCell>
                        {producto.nombre}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Box>

        )}

      </Paper>

    </Box>

  );
}