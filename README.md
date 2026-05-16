# ⚡ TechStore - Trabajo Final de React 🇦🇷🛒

¡Bienvenido a la versión final de **TechStore**! Este proyecto es la entrega final optimizada para el curso de React de **Talento Lab**. Se trata de un eCommerce completamente funcional, responsivo, accesible y administrable en tiempo real gracias a la integración con Firebase.

## 🚀 URL de Producción (Sitio en Vivo)
El proyecto se encuentra desplegado y listo para producción en:
👉 **[TechStore en Vercel](https://pre-entrega-salazar-y5dd-sy64a7v2h-matias-projects-5dcaa1cd.vercel.app)** *(Nota: Recordá actualizar este link si re-desplegaste la versión final)*

---

## ⚙️ Características Destacadas y Requerimientos Cumplidos

### 📌 1. Gestión del Carrito y Autenticación de Usuarios
* **Carrito Global (`Context API`):** Implementación de `CartContext` y `CartProvider` para agregar, disminuir, eliminar individuales y vaciar el carrito manteniendo el estado global de la compra de forma fluida.
* **Autenticación con Firebase (`AuthContext`):** Sistema centralizado para manejar el estado de login/registro conectado a **Firebase Authentication**.
* **Rutas Protegidas y Menú Dinámico:** El `Layout` oculta el acceso al Panel Admin y Creador de Cupones si el usuario no está logueado. Al presionar **"Salir"**, se limpia la sesión y el sistema redirige automáticamente a la Home (`/`) evitando cuelgues visuales.

### 📌 2. CRUD de Productos en Tiempo Real con Firebase
* **Base de Datos en la Nube:** Migración completa del catálogo local a **Firebase Firestore**.
* **Panel de Control de Administrador:** Formulario controlado con validaciones para crear productos nuevos, editar stock/precios actuales y dar de baja artículos.
* **Experiencia de Usuario (UX):** Mensajes e indicadores de carga ("Spinners") durante los viajes de la API de Firebase y modales de confirmación interactivos antes de eliminar cualquier producto de la base de datos.

### 📌 3. Optimización de Diseño y Responsividad
* **Maquetación Mobile-First:** Uso del sistema de grillas responsivas de **React-Bootstrap** para garantizar una visualización óptima en celulares, tablets y computadoras de escritorio.
* **Componentes Modulares:** Estilización avanzada mediante **styled-components** para mantener el código CSS limpio, aislado y escalable (aplicado en el buscador interactivo y la botonera de navegación).
* **Claridad Visual:** Inclusión de iconos dinámicos a través de la librería **React Icons**.

### 📌 4. Funcionalidades Avanzadas de Búsqueda y Paginación
* **Filtro en Tiempo Real:** Barra de búsqueda interactiva estilizada que filtra los productos por nombre a medida que el usuario escribe, reiniciando la paginación para evitar desbordes.
* **Paginador Inteligente:** Lógica matemática (`.slice()`) para fragmentar el catálogo extenso mostrando **6 productos por página**, optimizando los tiempos de renderizado en dispositivos móviles.

### 📌 5. SEO y Accesibilidad (Rúbrica Exclusiva)
* **SEO Dinámico:** Implementación de **React Helmet Async** para inyectar dinámicamente etiquetas `<title>` personalizadas con emojis (TechStore | Productos Nacionales 🇦🇷🛒) y meta descriptions en cada sección.
* **Accesibilidad Web:** Uso estricto de atributos `aria-label` en inputs y botones para garantizar una navegación accesible.

---

## 📂 Estructura Final del Proyecto

```bash
src/
├── components/
│   ├── Layout.jsx          # Estructura fija (Navbar con seguridad + Footer)
│   ├── ItemListContainer.jsx # Contenedor del catálogo responsivo
│   ├── Item.jsx            # Tarjeta individual de producto
│   ├── CartWidget.jsx      # Indicador numérico del carrito en el Header
│   └── GestionCupones.jsx  # Componente para el manejo de tickets de descuento
├── context/
│   ├── CartContext.jsx     # Estado global del carrito (Context API)
│   └── AuthContext.jsx     # Estado de autenticación global de Firebase
├── pages/
│   ├── Home.jsx            # Vista principal de bienvenida
│   ├── ProductsNacionales.jsx # Catálogo con buscador, paginador y SEO (Helmet)
│   ├── ProductDetail.jsx   # Detalle técnico y botón para añadir al carrito
│   ├── Cart.jsx            # Checkout del carrito con sistema de cupones local
│   ├── Login.jsx           # Formulario de ingreso de credenciales
│   └── Perfil.jsx          # Datos del usuario autenticado
├── firebase.js             # Configuración y conexión inicial a Firestore y Auth
├── App.jsx                 # Enrutador principal de la app (react-router-dom)
├── main.jsx                # Punto de entrada de la aplicación envuelto en Providers
└── index.css               # Estilos globales complementarios