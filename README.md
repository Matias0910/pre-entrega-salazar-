# Pre-Entrega Proyecto Salazar

Este es el proyecto de pre-entrega para el sitio web de e-commerce TechStore.

## Descripción

TechStore es una tienda online de productos tecnológicos que ofrece una experiencia de compra completa con catálogo de productos, carrito de compras y navegación intuitiva.

## Características

- **Diseño moderno**: Interfaz atractiva con colores profesionales y diseño responsivo
- **Catálogo completo**: 6 productos tecnológicos con imágenes de alta calidad
- **Carrito funcional**: Sistema de carrito con Context API para estado global
- **Navegación fluida**: Ruteo con React Router sin recargas de página
- **Equipo destacado**: Información del equipo con fotos y roles
- **Responsive**: Diseño adaptable a diferentes dispositivos

## Tecnologías Utilizadas

- React 18
- React Router DOM
- Context API
- Vite
- CSS moderno

## Requerimientos Cumplidos

- ✅ Estructura de carpetas organizada
- ✅ Componente Layout con Header, nav y Footer
- ✅ Footer con información de empresa y tarjetas de 3 personas del equipo
- ✅ Catálogo de productos cargado desde productos.json usando useEffect y fetch
- ✅ Componente Item reutilizable con diseño de tarjetas
- ✅ Sistema de ruteo con react-router-dom
- ✅ Rutas: /, /productos, /producto/:id, /carrito
- ✅ NavBar con Link y CartWidget con indicador numérico
- ✅ Context API para gestión del carrito
- ✅ Agregar productos al carrito desde vista de detalle
- ✅ CartWidget actualizado en tiempo real
- ✅ Vista de carrito mostrando productos con total

## Instalación

1. Clona el repositorio
2. Ejecuta `npm install`
3. Ejecuta `npm run dev` para desarrollo

## Despliegue

Para alojar en Netlify o Vercel:

1. **Netlify**:
   - Conecta tu repositorio de GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`
   - ¡Listo! Netlify detectará automáticamente la configuración

2. **Vercel**:
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Build command: `npm run build`
   - Output directory: `dist`

## URL de Producción

🚀 **Sitio en vivo**: [Pre-Entrega Salazar](https://pre-entrega-salazar-y5dd-sy64a7v2h-matias-projects-5dcaa1cd.vercel.app)

Accede desde cualquier navegador para probar la aplicación completa.

## Uso de la Aplicación

### Navegación

- **Inicio (/)**: Página principal con bienvenida
- **Productos (/productos)**: Catálogo completo de productos
- **Detalle de Producto (/producto/:id)**: Vista detallada con opción de agregar al carrito
- **Carrito (/carrito)**: Gestión completa del carrito de compras

### Funcionalidades del Carrito

- Agregar productos desde la vista de detalle
- Aumentar/disminuir cantidades con botones + y -
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculo automático de totales
- Contador en tiempo real en el header

## Estructura del Proyecto

```bash
src/
├── components/
│   ├── Header.jsx          # Navegación principal
│   ├── Footer.jsx          # Información de empresa y equipo
│   ├── Layout.jsx          # Layout general
│   ├── Item.jsx            # Tarjeta de producto
│   ├── ItemListContainer.jsx # Contenedor del catálogo
│   └── CartWidget.jsx      # Widget del carrito
├── context/
│   └── CartContext.jsx     # Estado global del carrito
├── pages/
│   ├── Home.jsx            # Página de inicio
│   ├── Products.jsx        # Página de productos
│   ├── ProductDetail.jsx   # Detalle de producto
│   └── Cart.jsx            # Página del carrito
├── data/
│   └── productos.json      # Datos de productos
├── App.jsx                 # Componente principal con rutas
├── main.jsx                # Punto de entrada
└── index.css               # Estilos globales
```

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run lint` - Ejecuta ESLint
- `npm run preview` - Vista previa del build

## Autor

Proyecto desarrollado por Matias Salazar para la pre-entrega del curso de React.

## Notas Adicionales

- El proyecto utiliza Vite para un desarrollo rápido y optimizado
- Las imágenes de productos se cargan desde Unsplash
- El estado del carrito se mantiene durante la sesión usando Context API
- Diseño responsive que funciona en móviles, tablets y desktop

## Licencia

Este proyecto está disponible bajo licencia MIT.
