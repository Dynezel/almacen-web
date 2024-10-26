import React, { useEffect, useState } from "react";

export default function BusquedaProducto() {
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [productos, setProductos] = useState([]);
  
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

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setFiltroBusqueda(searchTerm);

    const filteredItems = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResultadosBusqueda(filteredItems);
  };

  return (
    <div>
      <input
        type="text"
        value={filtroBusqueda}
        onChange={handleInputChange}
        placeholder="Buscar"
      />
      <div>
        {resultadosBusqueda.map((producto) => (
          <div key={producto.fecha}>
            <h2>{producto.fecha}</h2>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th className="tabla-headers">Nombre</th>
                  <th className="tabla-headers">Precio</th>
                  <th className="tabla-headers">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.tipo}</td>
                  <td>{producto.precio}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
