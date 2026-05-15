import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { productosData, esenciasGlobales } from "./data/productos"; 

export default function GarugaLanding() {
  const [categoriaActual, setCategoriaActual] = useState("todos");
  const [imagenModal, setImagenModal] = useState(null);
  const [hidden, setHidden] = useState(false);
  
  // ESTADOS DEL CARRITO
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const { scrollY } = useScroll();
  const productosRef = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const seleccionarCategoria = (cat) => {
    setCategoriaActual(cat);
    if (productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const productosFiltrados = productosData.filter(p => {
    if (categoriaActual === "todos") return true;
    if (categoriaActual === "stock disponible") return p.variantesStock && p.variantesStock.length > 0;
    return p.categoria === categoriaActual;
  });

  // FUNCIONES DEL CARRITO
  const agregarAlCarrito = (producto, aromaSeleccionado = "") => {
    setCarrito((prev) => {
      // Validar si ya existe el mismo producto con el mismo aroma
      const existe = prev.find(item => item.nombre === producto.nombre && item.aroma === aromaSeleccionado);
      if (existe) {
        return prev.map(item => 
          (item.nombre === producto.nombre && item.aroma === aromaSeleccionado) 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prev, { ...producto, aroma: aromaSeleccionado, cantidad: 1 }];
    });
    setCarritoAbierto(true); // Abre el carrito para mostrar el feedback visual
  };

  const actualizarCantidad = (index, valor) => {
    setCarrito((prev) => {
      const nuevo = [...prev];
      nuevo[index].cantidad += valor;
      if (nuevo[index].cantidad <= 0) {
        nuevo.splice(index, 1);
      }
      return nuevo;
    });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioNum = parseInt(item.precio.replace("$", ""));
      return total + (precioNum * item.cantidad);
    }, 0);
  };

  const finalizarCompraWhatsApp = () => {
    let mensaje = "Hola Garuga! Mi pedido es:\n\n";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} ${item.aroma ? `(${item.aroma})` : ''} x${item.cantidad} - ${item.precio}\n`;
    });
    mensaje += `\n*Total: $${calcularTotal()}*\n\n`;
    mensaje += "Me gustaría coordinar el pago y el envío a mi localidad. ✨";
    
    const url = `https://wa.me/5492236325321?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#fdfaf7", minHeight: "100vh", color: "#4b3f35", fontFamily: 'serif', paddingBottom: "100px" }}>
      
      {/* HEADER INTELIGENTE */}
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ borderBottom: "1px solid #eee", position: "sticky", top: 0, backgroundColor: "rgba(255,255,255,0.92)", zIndex: 40, backdropFilter: "blur(10px)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          
          {/* Botón Carrito Flotante en el Header */}
          <button 
            onClick={() => setCarritoAbierto(true)}
            style={{ position: "absolute", right: "30px", top: "35px", background: "none", border: "none", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          >
            👜 <span style={{ fontSize: "12px", fontFamily: "sans-serif", backgroundColor: "#4b3f35", color: "white", borderRadius: "50%", padding: "2px 6px" }}>{carrito.reduce((a, b) => a + b.cantidad, 0)}</span>
          </button>

          <img 
            src="/logo.png" 
            alt="GARUGA" 
            style={{ width: "140px", marginBottom: "25px", cursor: "pointer" }}
            onClick={() => seleccionarCategoria("todos")}
          />

          <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
            {["todos", "stock disponible", "velas de soja", "perfuminas", "difusores"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => seleccionarCategoria(cat)} 
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "5px 0", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: categoriaActual === cat ? "#000" : "#888", fontWeight: categoriaActual === cat ? "bold" : "normal", transition: "color 0.3s ease", fontFamily: 'serif' }}
              >
                {cat === "stock disponible" ? "✨ " + cat : cat}
                {categoriaActual === cat && (
                  <motion.div layoutId="underline" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: "#000" }} />
                )}
              </button>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* PRESENTACIÓN */}
      <section style={{ padding: "100px 20px 60px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "35px", fontWeight: "300", fontStyle: "italic", color: "#333" }}>¡Bienvenidos a Garuga!</h1>
        <p style={{ fontSize: "19px", color: "#555", lineHeight: "1.9", marginBottom: "25px", fontStyle: "italic" }}>
          "Velas de cera de soja aromáticas y perfuminas hechas con amor y buenas vibras. Envíos a todo el país."
        </p>
      </section>

      {/* GUÍA DE AROMAS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 80px 20px" }}>
        <div style={{ backgroundColor: "#f9f4ef", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px solid #eee" }}>
          <h3 style={{ fontSize: "11px", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "25px", opacity: 0.6 }}>Nuestras Esencias</h3>
          <p style={{ maxWidth: "900px", margin: "0 auto", fontSize: "15px", fontStyle: "italic", opacity: 0.9, lineHeight: "1.8" }}>
            {esenciasGlobales.join("  •  ")}
          </p>
        </div>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <main ref={productosRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px 50px" }}>
          {productosFiltrados.map((prod, i) => (
            <motion.div layout key={prod.nombre + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "between" }}>
              <div>
                <div 
                  style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#f9f9f9", marginBottom: "28px", borderRadius: "2px", cursor: "pointer", border: "1px solid #f0f0f0" }}
                  onClick={() => setImagenModal(prod.img)}
                >
                  <motion.img whileHover={{ scale: 1.05 }} src={prod.img} alt={prod.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                
                <h3 style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "12px" }}>{prod.nombre}</h3>
                
                {categoriaActual === "stock disponible" ? (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fffaf0", border: "1px solid #f3e5ab" }}>
                    <p style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#b8860b" }}>Disponible en:</p>
                    <p style={{ fontSize: "13px", fontStyle: "italic" }}>{prod.variantesStock.join(", ")}</p>
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "22px", fontStyle: "italic" }}>{prod.desc}</p>
                )}

                <p style={{ fontSize: "18px", marginBottom: "25px", color: "#333" }}>{prod.precio}</p>
              </div>

              {/* Botón dinámico de compra */}
              {categoriaActual === "stock disponible" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {prod.variantesStock.map(aroma => (
                    <button 
                      key={aroma}
                      onClick={() => agregarAlCarrito(prod, aroma)}
                      style={{ width: "100%", padding: "12px 0", border: "1px solid #4b3f35", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: 'serif' }}
                    >
                      Agregar Aroma: {aroma} 👜
                    </button>
                  ))}
                </div>
              ) : (
                <button 
                  onClick={() => agregarAlCarrito(prod, "A elección")}
                  style={{ width: "100%", padding: "16px 0", border: "1px solid #000", backgroundColor: "#000", color: "#fff", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", fontFamily: 'serif' }}
                >
                  Agregar al carrito 👜
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* COMPONENTE INTERFAZ DEL CARRITO (DRAWER SIDEBAR) */}
      <AnimatePresence>
        {carritoAbierto && (
          <>
            {/* Fondo oscuro */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCarritoAbierto(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 100, backdropFilter: "blur(3px)" }}
            />
            {/* Panel lateral */}
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "450px", backgroundColor: "#fff", zIndex: 101, boxShadow: "-10px 0 30px rgba(0,0,0,0.05)", padding: "40px 30px", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "20px", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", uppercase: "true", letterSpacing: "0.2em", margin: 0 }}>Tu Carrito</h3>
                <button onClick={() => setCarritoAbierto(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
              </div>

              {/* Lista de productos en carrito */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {carrito.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "40px" }}>Tu carrito está vacío.</p>
                ) : (
                  carrito.map((item, index) => (
                    <div key={index} style={{ display: "flex", gap: "15px", marginBottom: "25px", borderBottom: "1px solid #fbfbfb", paddingBottom: "15px", alignItems: "center" }}>
                      <img src={item.img} alt={item.nombre} style={{ width: "70px", height: "90px", objectFit: "cover", borderRadius: "2px" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "13px", margin: "0 0 5px 0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.nombre}</h4>
                        <p style={{ fontSize: "11px", color: "#888", margin: "0 0 10px 0", fontStyle: "italic" }}>Aroma: {item.aroma}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                          <div style={{ display: "flex", border: "1px solid #ddd", alignItems: "center" }}>
                            <button onClick={() => actualizarCantidad(index, -1)} style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer" }}>-</button>
                            <span style={{ fontSize: "12px", fontFamily: "sans-serif" }}>{item.cantidad}</span>
                            <button onClick={() => actualizarCantidad(index, 1)} style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer" }}>+</button>
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: "bold" }}>{item.precio}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout */}
              {carrito.length > 0 && (
                <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                    <span style={{ fontSize: "14px", uppercase: "true", letterSpacing: "0.1em" }}>Total Estimado:</span>
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>${calcularTotal()}</span>
                  </div>
                  <button 
                    onClick={finalizarCompraWhatsApp}
                    style={{ width: "100%", padding: "16px 0", backgroundColor: "#4b3f35", color: "white", border: "none", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: 'serif' }}
                  >
                    Iniciar Pedido por WhatsApp 🚀
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {imagenModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}
            onClick={() => setImagenModal(null)}
          >
            <motion.img src={imagenModal} initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", border: "2px solid white" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
