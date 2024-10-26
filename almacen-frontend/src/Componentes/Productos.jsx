import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/productos.css";
export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/producto/lista"
        );
        setProductos(response.data);

        productos.sort((a, b) => newDate(a.createdAt) - newDate(b.createdAt));
        console.log(productos);
      } catch (error) {
        console.error("Se ha producido un error al traer los productos", error);
      }
    };

    fetchProductos();
  }, []);

  const productosAgrupadosPorFecha = productos.reduce(
    (groupedProducts, producto) => {
      const fecha = producto.fecha.split("T")[0];
      if (!groupedProducts[fecha]) {
        groupedProducts[fecha] = [];
      }
      groupedProducts[fecha].push(producto);
      return groupedProducts;
    },
    {}
  );

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setFiltroBusqueda(searchTerm);

    const filteredItems = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResultadosBusqueda(filteredItems);
  };

  return (
    <div className="productos">
      <input
        type="text"
        value={filtroBusqueda}
        onChange={handleInputChange}
        placeholder="Buscar"
        className="busqueda"
      />
      {filtroBusqueda ? (
      <div>
        {resultadosBusqueda.map((producto) => (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th className="tabla-headers">Fecha</th>
                <th className="tabla-headers">Nombre</th>
                <th className="tabla-headers">Precio</th>
                <th className="tabla-headers">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr key={producto.id}>
                <td>{producto.fecha.split("T")[0]}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.tipo}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
      ) : (
      <div>
        {Object.keys(productosAgrupadosPorFecha).map((fecha) => (
          <div key={fecha}>
            <h2>{fecha}</h2>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th className="tabla-headers">Nombre</th>
                  <th className="tabla-headers">Precio</th>
                  <th className="tabla-headers">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {productosAgrupadosPorFecha[fecha].map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
