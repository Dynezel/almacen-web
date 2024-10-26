import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RegistrarProductos() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [gramos, setGramos] = useState(0);
  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8080/producto/guardar", null, {
        params: {
          nombre,
          tipo,
          precio,
          porcentaje,
          gramos,
          cantidad,
        },
      });
    } catch (error) {
      console.log("Se ha registrado un error al crear un producto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="productos">
      <h3>
        {" "}
        <u> Registrar Productos </u>{" "}
      </h3>
      <div>
        <label htmlFor="nombreProducto"> Producto: </label>
        <input
          type="text"
          id="nombreProducto"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
      <div>
        <laber htmlFor="tipoProducto"> Tipo: </laber>
        <input
          type="text"
          id="tipoProducto"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        />
      </div>
      <div>
        <laber htmlFor="precioProducto"> Precio: </laber>
        <input
          type="number"
          id="precioProducto"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
        />
      </div>
      <div>
        <laber htmlFor="porcentajeProducto"> Porcentaje: </laber>
        <input
          type="number"
          id="porcentajeProducto"
          value={porcentaje}
          onChange={(event) => setPorcentaje(event.target.value)}
        />
      </div>
      <div>
        <laber htmlFor="gramosProducto"> Gramos: </laber>
        <input
          type="number"
          id="gramosProducto"
          value={gramos}
          onChange={(event) => setGramos(event.target.value)}
        />
      </div>
      <div>
        <laber htmlFor="cantidadProducto"> Cantidad: </laber>
        <input
          type="number"
          id="cantidadProducto"
          value={cantidad}
          onChange={(event) => setCantidad(event.target.value)}
        />
      </div>
      <p>
        Notas: Para sacar precio de fiambre poner
        <br/> solamente el nombre, tipo y precio
      </p>
      <button type="submit">Publicar</button>
    </form>
  );
}
