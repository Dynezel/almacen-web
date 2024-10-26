package dynezel.almacen2024.Servicios;

import dynezel.almacen2024.Entidades.Producto;
import dynezel.almacen2024.Repositorios.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductoServicio {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    public Producto publicarProducto(String nombre, String tipo,int precio, int porcentaje, int gramos, int cantidad) {
        Producto producto = new Producto();
        producto.setNombre(nombre);
        producto.setTipo(tipo);

        if(cantidad > 1) {
            precio = dividirPorCantidad(precio, cantidad);
        }

        if(gramos > 1) {
            precio = sacarPrecioPorKilo(precio, gramos);
            System.out.println( "Precio al sacar por kilo: " + precio);
        }
        if(tipo.equalsIgnoreCase("fiambre")) {
            precio = sacarPrecioFiambres(precio);
        }
        else {
            precio = sacarPorcentaje(porcentaje, precio);
        }
        System.out.println("Precio luego de sacar porcentaje: " + precio);
        producto.setPrecio(precio);
        producto.setFecha(LocalDateTime.now());


        return productoRepositorio.save(producto);
    }

    public int sacarPorcentaje(int porcentaje, int precio) {
        return precio + (precio * porcentaje / 100);
    }

    public int sacarPrecioPorKilo(int precio, int gramos) {
        int multiplicador = 1000/gramos;
        return multiplicador * precio;
    }

    public int sacarPrecioFiambres(int precio) {
        int precioNuevo = precio + (precio * 50 /100);
        return precioNuevo /10;
    }

    public int dividirPorCantidad(int precio, int cantidad) {
        System.out.println("precio: " + precio);
        System.out.println("precio dividido: " + precio / cantidad);
        return precio / cantidad;
    }

    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();
    }

    public List<Producto> listarProductosFechaDesc() {
        return productoRepositorio.findAllByOrderByFechaDesc();
    }

}
