package dynezel.almacen2024.Controladores;

import dynezel.almacen2024.Entidades.Producto;
import dynezel.almacen2024.Servicios.ProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class ProductoControlador {

    @Autowired
    private ProductoServicio productoServicio;

    @GetMapping("/")
    public String saludo() {
        return "Hola mundo";
    }

    @PostMapping("/producto/guardar")
    public ResponseEntity<Producto> guardarProducto(@RequestParam String nombre, @RequestParam String tipo, @RequestParam Integer precio,
                                                    int porcentaje, int gramos, int cantidad) {
        Producto productoCreado = productoServicio.publicarProducto(nombre, tipo, precio, porcentaje, gramos, cantidad);
        return new ResponseEntity<>(productoCreado, HttpStatus.CREATED);
    }

    @GetMapping("/producto/lista")
    public List<Producto> listaProductos() {
        return productoServicio.listarProductosFechaDesc();
    }

}
