import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { productosData, esenciasGlobales } from "./data/productos"; 

export default function GarugaLanding() {
  const [categoriaActual, setCategoriaActual] = useState("todos");
  const [imagenModal, setImagenModal] = useState(null);
  const [hidden, setHidden] = useState(false);
  
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [datosEnvio, setDatosEnvio] = useState({ cp: "", localidad: "", direccion: "" });

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
    if (categoriaActual === "stock disponible") {
      return p.variantesStock && Object.keys(p.variantesStock).length > 0;
    }
    return p.categoria === categoriaActual;
  });

  const obtenerStockDisponibleReal = (producto, aroma) => {
    if (!producto.variantesStock) return 0;
    const stockMaximo = producto.variantesStock[aroma] || 0;
    const enCarrito = carrito.find(item => item.nombre === producto.nombre && item.aroma === aroma);
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
    return stockMaximo - cantidadEnCarrito;
  };

  const agregarAlCarrito = (producto, aromaSeleccionado, esStockInmediato = false) => {
    if (esStockInmediato) {
      const disponible = obtenerStockDisponibleReal(producto, aromaSeleccionado);
      if (disponible <= 0) {
        alert("¡Ups! No podés agregar más unidades de este aroma porque agotarías el stock disponible.");
        return;
      }
    }

    setCarrito((prev) => {
      const existe = prev.find(item => item.nombre === producto.nombre && item.aroma === aromaSeleccionado);
      if (existe) {
        return prev.map(item => 
          (item.nombre === producto.nombre && item.aroma === aromaSeleccionado) 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prev, { ...producto, aroma: aromaSeleccionado, cantidad: 1, esStockInmediato }];
    });
    setCarritoAbierto(true);
  };

  const actualizarCantidad = (index, valor) => {
    setCarrito((prev) => {
      const nuevo = [...prev];
      const item = nuevo[index];
      
      if (valor > 0 && item.esStockInmediato) {
        const stockMaximo = item.variantesStock[item.aroma] || 0;
        if (item.cantidad + valor > stockMaximo) {
          alert(`Lo sentimos, solo nos quedan ${stockMaximo} unidades de este aroma.`);
          return prev;
        }
      }

      item.cantidad += valor;
      if (item.cantidad <= 0) {
        nuevo.splice(index, 1);
      }
      return nuevo;
    });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioNum = parseInt(item.precio.replace("$", "").replace(".", ""));
      return total + (precioNum * item.cantidad);
    }, 0);
  };

  const finalizarCompraWhatsApp = () => {
    if (!datosEnvio.cp || !datosEnvio.localidad) {
      alert("Por favor, completa al menos tu Código Postal y Localidad para coordinar el envío.");
      return;
    }

    let mensaje = "Hola Garuga! Mi pedido es:\n\n";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} ${item.aroma ? `(${item.aroma})` : ''} x${item.cantidad} - ${item.precio}\n`;
    });
    mensaje += `\n*Total Productos: $${calcularTotal().toLocaleString("es-AR")}*\n\n`;
    mensaje += `🚚 *DATOS DE ENVÍO:*\n`;
    mensaje += `• C.P.: ${datosEnvio.cp}\n`;
    mensaje += `• Localidad: ${datosEnvio.localidad}\n`;
    mensaje += `• Dirección: ${datosEnvio.direccion || "A coordinar"}\n\n`;
    mensaje += "Me gustaría que me pases el costo de envío a mi sucursal más cercana para hacer la transferencia. ✨";
    
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
            {["todos", "stock disponible", "dia del amigo", "velas de soja", "perfuminas", "difusores"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => seleccionarCategoria(cat)} 
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "5px 0", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: categoriaActual === cat ? "#000" : "#888", fontWeight: categoriaActual === cat ? "bold" : "normal", transition: "color 0.3s ease", fontFamily: 'serif' }}
              >
                {cat === "stock disponible" ? "✨ " + cat : cat === "dia del amigo" ? "🎁 " + cat : cat}
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
          Velas de cera de soja aromáticas, difusores y perfuminas hechas con amor y buenas vibras. Envíos a todo el país.
      
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
            <motion.div layout key={prod.nombre + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                    <p style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#b8860b" }}>Stock Inmediato:</p>
                    {prod.variantesStock && Object.entries(prod.variantesStock).map(([aroma, cant]) => (
                      <p key={aroma} style={{ fontSize: "13px", fontStyle: "italic", margin: "4px 0" }}>
                        {aroma}: <strong>{cant} unidades</strong> disponibles
                      </p>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "22px", fontStyle: "italic" }}>{prod.desc}</p>
                )}

                <p style={{ fontSize: "18px", marginBottom: "25px", color: "#333" }}>{prod.precio}</p>
              </div>

              {/* LÓGICA DE BOTONES INTELIGENTES */}
              {categoriaActual === "stock disponible" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {prod.variantesStock && Object.keys(prod.variantesStock).map(aroma => {
                    const restante = obtenerStockDisponibleReal(prod, aroma);
                    const sinStock = restante <= 0;
                    
                    return (
                      <button 
                        key={aroma}
                        disabled={sinStock}
                        onClick={() => agregarAlCarrito(prod, aroma, true)}
                        style={{ 
                          width: "100%", padding: "12px 0", 
                          border: "1px solid #4b3f35", 
                          backgroundColor: sinStock ? "#eee" : "transparent", 
                          color: sinStock ? "#999" : "#4b3f35",
                          fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", 
                          cursor: sinStock ? "not-allowed" : "pointer", fontFamily: 'serif' 
                        }}
                      >
                        {sinStock ? `Agotado: ${aroma} ✕` : `Llevar ${aroma} (${restante} disp.) 👜`}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <a 
                  href={`https://wa.me/5492236325321?text=Hola Garuga! Me interesa encargar: ${prod.nombre} con esencia a elección.`}
                  target="_blank" rel="noreferrer"
                  style={{ display: "inline-block", width: "100%", padding: "16px 0", border: "1px solid #000", backgroundColor: "#000", color: "#fff", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", fontFamily: 'serif' }}
                >
                  Encargar por WhatsApp 💬
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* CARRITO ABIERTO (DISEÑO FIJO Y COMPACTO) */}
      <AnimatePresence>
        {carritoAbierto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} style={{ width: "100%", maxWidth: "450px", backgroundColor: "#fff", height: "100vh", padding: "30px 25px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
              
              {/* HEADER DEL CARRITO */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>Tu Carrito</h2>
                <button onClick={() => setCarritoAbierto(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>✕</button>
              </div>

              {carrito.length === 0 ? (
                <p style={{ fontStyle: "italic", textAlign: "center", marginTop: "100px" }}>El carrito está vacío.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 40px)", justifyContent: "space-between" }}>
                  
                  {/* LISTADO DE PRODUCTOS (SCROLLABLE INDEPENDIENTE) */}
                  <div style={{ overflowY: "auto", flexGrow: 1, paddingRight: "5px", marginBottom: "15px" }}>
                    {carrito.map((item, index) => (
                      <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
                        <div>
                          <h4 style={{ fontSize: "13px", textTransform: "uppercase", margin: "0 0 5px 0" }}>{item.nombre}</h4>
                          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#888", margin: 0 }}>Aroma: {item.aroma}</p>
                          <p style={{ fontSize: "12px", margin: "5px 0 0 0", fontWeight: "bold" }}>{item.precio}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <button onClick={() => actualizarCantidad(index, -1)} style={{ background: "none", border: "1px solid #ddd", width: "24px", height: "24px", cursor: "pointer" }}>-</button>
                          <span style={{ fontSize: "13px" }}>{item.cantidad}</span>
                          <button onClick={() => actualizarCantidad(index, 1)} style={{ background: "none", border: "1px solid #ddd", width: "24px", height: "24px", cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER DEL CARRITO (FORMULARIO, TOTAL Y BOTÓN SIEMPRE VISIBLES ABAJO) */}
                  <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", backgroundColor: "#fff" }}>
                    
                    {/* Formulario de Envío */}
                    <div style={{ marginBottom: "15px", backgroundColor: "#fdfaf7", padding: "12px", borderRadius: "4px", border: "1px dashed #ddd" }}>
                      <p style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 0, marginBottom: "8px" }}>
                        🚚 Envío a toda Argentina
                      </p>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <input 
                          type="text" placeholder="Cód. Postal" value={datosEnvio.cp} 
                          onChange={(e) => setDatosEnvio({...datosEnvio, cp: e.target.value})}
                          style={{ width: "35%", padding: "8px", border: "1px solid #ddd", fontSize: "11px", fontFamily: "sans-serif", boxSizing: "border-box" }}
                        />
                        <input 
                          type="text" placeholder="Localidad / Prov." value={datosEnvio.localidad} 
                          onChange={(e) => setDatosEnvio({...datosEnvio, localidad: e.target.value})}
                          style={{ width: "65%", padding: "8px", border: "1px solid #ddd", fontSize: "11px", fontFamily: "sans-serif", boxSizing: "border-box" }}
                        />
                      </div>
                      <input 
                        type="text" placeholder="Dirección (Calle y Altura) - Opcional" value={datosEnvio.direccion} 
                        onChange={(e) => setDatosEnvio({...datosEnvio, direccion: e.target.value})}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", fontSize: "11px", fontFamily: "sans-serif", boxSizing: "border-box" }}
                      />
                    </div>

                    {/* Total y Botón de WhatsApp */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Total:</span>
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>${calcularTotal().toLocaleString("es-AR")}</span>
                    </div>
                    
                    <button 
                      onClick={finalizarCompraWhatsApp} 
                      style={{ 
                        width: "100%", 
                        padding: "14px 0", 
                        backgroundColor: "#4b3f35", 
                        color: "white", 
                        border: "none", 
                        fontSize: "11px", 
                        letterSpacing: "0.2em", 
                        textTransform: "uppercase", 
                        cursor: "pointer", 
                        fontFamily: 'serif',
                        fontWeight: "bold"
                      }}
                    >
                      Iniciar Pedido por WhatsApp 🚀
                    </button>
                  </div>

                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {imagenModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }} onClick={() => setImagenModal(null)}>
            <motion.img src={imagenModal} initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", border: "2px solid white" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
