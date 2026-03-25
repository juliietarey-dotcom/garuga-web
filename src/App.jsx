import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { productosData, esenciasGlobales } from "./data/productos"; 

export default function GarugaLanding() {
  const [categoriaActual, setCategoriaActual] = useState("todos");
  const [imagenModal, setImagenModal] = useState(null);
  
  // Lógica para esconder/mostrar el menú al hacer scroll
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const productosRef = useRef(null); // Referencia para el auto-scroll

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true); // Bajando -> Esconder
    } else {
      setHidden(false); // Subiendo -> Mostrar
    }
  });

  const seleccionarCategoria = (cat) => {
    setCategoriaActual(cat);
    // Scroll suave hacia el inicio de los productos
    if (productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const productosFiltrados = productosData.filter(p => {
    if (categoriaActual === "todos") return true;
    if (categoriaActual === "stock disponible") return p.variantesStock && p.variantesStock.length > 0;
    return p.categoria === categoriaActual;
  });

  return (
    <div style={{ backgroundColor: "#fdfaf7", minHeight: "100vh", color: "#4b3f35", fontFamily: 'serif', paddingBottom: "100px" }}>
      
      {/* HEADER INTELIGENTE (Se esconde y aparece) */}
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ 
          borderBottom: "1px solid #eee", 
          position: "sticky", 
          top: 0, 
          backgroundColor: "rgba(255,255,255,0.92)", 
          zIndex: 50, 
          backdropFilter: "blur(10px)" 
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <motion.img 
            src="/logo.png" 
            alt="GARUGA" 
            style={{ width: "140px", marginBottom: "25px", cursor: "pointer" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => seleccionarCategoria("todos")}
          />

          <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
            {["todos", "stock disponible", "velas de soja", "perfuminas", "difusores"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => seleccionarCategoria(cat)} 
                style={{ 
                  position: "relative", 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  padding: "5px 0",
                  fontSize: "12px", 
                  letterSpacing: "0.2em", 
                  textTransform: "uppercase",
                  color: categoriaActual === cat ? "#000" : "#888",
                  fontWeight: categoriaActual === cat ? "bold" : "normal",
                  transition: "color 0.3s ease",
                  fontFamily: 'serif'
                }}
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
          "Emprendimiento de velas de cera de soja aromáticas, difusores y perfuminas para llenar tus espacios de calidez y armonía."
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

      {/* GRILLA DE PRODUCTOS - El Ref ayuda al scroll */}
      <main ref={productosRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "18px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "60px", opacity: 0.8, fontStyle: "italic" }}>
          — {categoriaActual} —
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px 50px" }}>
          {productosFiltrados.map((prod, i) => (
            <motion.div layout key={prod.nombre + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
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

              <p style={{ fontSize: "18px", marginBottom: "35px", color: "#333" }}>{prod.precio}</p>

              <a 
                href={`https://wa.me/5492236325321?text=Hola Garuga! Me interesa: ${prod.nombre}`}
                target="_blank" rel="noreferrer"
                style={{ display: "inline-block", width: "100%", padding: "16px 0", border: "1px solid #000", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", color: "#000" }}
              >
                Consultar por WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {imagenModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}
            onClick={() => setImagenModal(null)}
          >
            <motion.img 
              src={imagenModal} 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", border: "2px solid white" }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <a href="https://wa.me/5492236325321" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: "40px", right: "40px", backgroundColor: "white", padding: "18px", borderRadius: "50%", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", zIndex: 90 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{ width: "26px", height: "26px", opacity: 0.6 }} alt="WA" />
      </a>
    </div>
  );
}
