import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productosData, esenciasGlobales } from "./data/productos"; 

export default function GarugaLanding() {
  const [categoriaActual, setCategoriaActual] = useState("todos");
  
  // Estado para manejar qué imagen se ve en grande (Lightbox)
  const [imagenModal, setImagenModal] = useState(null);

  const productosFiltrados = productosData.filter(p => {
    if (categoriaActual === "todos") return true;
    if (categoriaActual === "stock disponible") return p.variantesStock && p.variantesStock.length > 0;
    return p.categoria === categoriaActual;
  });

  return (
    <div style={{ backgroundColor: "#fdfaf7", minHeight: "100vh", color: "#4b3f35", fontFamily: 'serif', paddingBottom: "100px" }}>
      
      {/* 1. BARRA SUPERIOR ELIMINADA */}

      {/* 2. HEADER SOFISTICADO (Logo centrado y Menú) */}
      <header style={{ borderBottom: "1px solid #eee", position: "sticky", top: 0, backgroundColor: "rgba(255,255,255,0.95)", zIndex: 50, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Logo - Retenemos el tamaño de 180px */}
          <motion.img 
            src="/logo.png" 
            alt="GARUGA" 
            style={{ width: "180px", marginBottom: "40px", cursor: "pointer" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setCategoriaActual("todos")} // Volver a Inicio al clickear logo
          />

          {/* Menú Superior de Categorías Estilo Inti (con Underline animado) */}
          <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "45px" }}>
            {["todos", "stock disponible", "velas de soja", "perfuminas", "difusores"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategoriaActual(cat)} 
                style={{ 
                  position: "relative", 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  padding: "5px 0",
                  // AGRANDAMOS LA LETRA DEL MENÚ (de 11px a 12px/13px)
                  fontSize: "12px", 
                  letterSpacing: "0.28em", 
                  textTransform: "uppercase",
                  color: categoriaActual === cat ? "#000" : "#888",
                  fontWeight: categoriaActual === cat ? "bold" : "normal",
                  transition: "color 0.3s ease",
                  fontFamily: 'serif'
                }}
              >
                {cat === "stock disponible" ? "✨ " + cat : cat}
                
                {/* LÍNEA ANIMADA (Underline) de Framer Motion */}
                {categoriaActual === cat && (
                  <motion.div 
                    layoutId="underline"
                    style={{ 
                      position: "absolute", 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      height: "1px", 
                      backgroundColor: "#000" 
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 3. MENSAJE DE PRESENTACIÓN (Retocado espaciado y tamaño) */}
      <section style={{ padding: "100px 20px 60px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "35px", fontWeight: "300", fontStyle: "italic", color: "#333" }}>
          ¡Bienvenidos a Garuga!
        </h1>
        <p style={{ fontSize: "19px", color: "#555", lineHeight: "1.9", marginBottom: "25px", fontStyle: "italic" }}>
          Emprendimiento de velas de cera de soja aromáticas, difusores y perfuminas para llenar tus espacios de calidez y armonía. 
        </p>
        <p style={{ fontSize: "17px", color: "#666", lineHeight: "1.8", borderTop: "1px solid #f0f0f0", paddingTop: "35px", maxWidth: "700px", margin: "0 auto" }}>
          Cada pedido está hecho artesanalmente y con fragancias envolventes que transforman cualquier momento en una experiencia única. En este emprendimiento todo es hecho con amor y buenas vibras.
        </p>
      </section>

      {/* 4. GUÍA DE AROMAS (Cajita estética) */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 60px 20px" }}>
        <div style={{ backgroundColor: "#f9f4ef", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px solid #eee", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: "11px", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "25px", opacity: 0.6, fontWeight: "bold" }}>Nuestras Esencias</h3>
          {/* AGRANDAMOS LA LETRA DE LAS ESENCIAS (de 13px a 15px) */}
          <p style={{ maxWidth: "900px", margin: "0 auto", fontSize: "15px", fontStyle: "italic", opacity: 0.9, lineHeight: "1.8", letterSpacing: "0.05em" }}>
            {esenciasGlobales.join("  •  ")}
          </p>
        </div>
      </div>

      {/* 5. GRILLA DE PRODUCTOS */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2 className="text-center text-xl tracking-[0.3em] uppercase mb-16 opacity-80 italic">
          — {categoriaActual} —
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "70px 50px" }}>
          {productosFiltrados.map((prod, i) => (
            <motion.div 
              layout 
              key={prod.nombre + i} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
              className="group"
            >
              
              {/* Contenedor de Imagen (Clickable para abrir Lightbox) */}
              <div 
                style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#f9f9f9", marginBottom: "28px", borderRadius: "2px", border: "1px solid #f0f0f0", cursor: "pointer", position: "relative" }}
                onClick={() => setImagenModal(prod.img)} // Abrir imagen al click
              >
                <img 
                  src={prod.img} 
                  alt={prod.nombre} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.8s ease" }} 
                  className="group-hover:scale-105 group-hover:brightness-105"
                />
                {/* Iconito sutil de "zoom" al hover */}
                <div style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "rgba(255,255,255,0.7)", padding: "5px", borderRadius: "50%", opacity: 0 }} className="group-hover:opacity-100 transition-opacity">
                    🔍
                </div>
              </div>
              
              {/* AGRANDAMOS LA LETRA DEL NOMBRE (de 14px a 16px) */}
              <h3 style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "12px", color: "#222" }}>
                {prod.nombre}
              </h3>
              
              {/* LÓGICA DE TEXTO DINÁMICO */}
              {categoriaActual === "stock disponible" ? (
                <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fffaf0", border: "1px solid #f3e5ab", borderRadius: "4px" }}>
                  {/* AGRANDAMOS LA LETRA DEL STOCK */}
                  <p style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#b8860b", marginBottom: "6px", letterSpacing: "0.1em" }}>
                    Disponible en los aromas:
                  </p>
                  <p style={{ fontSize: "12px", fontStyle: "italic", color: "#666" }}>
                    {prod.variantesStock.join(", ")}
                  </p>
                </div>
              ) : (
                // AGRANDAMOS LA LETRA DE LA DESCRIPCIÓN (de 11px a 12px)
                <p style={{ fontSize: "12px", color: "#999", marginBottom: "22px", fontStyle: "italic", letterSpacing: "0.05em" }}>
                  {prod.desc}
                </p>
              )}

              {/* AGRANDAMOS LA LETRA DEL PRECIO (de 16px a 18px) */}
              <p style={{ fontSize: "18px", marginBottom: "35px", color: "#333", fontWeight: "500" }}>
                {prod.precio}
              </p>

              <a 
                href={`https://wa.me/5492236325321?text=Hola Garuga! Me interesa: ${prod.nombre}${categoriaActual === 'stock disponible' ? ' (en stock)' : ''}`}
                target="_blank" rel="noreferrer"
                style={{ display: "inline-block", width: "100%", padding: "16px 0", border: "1px solid #000", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", color: "#000", transition: "all 0.3s ease", fontFamily: 'serif' }}
                className="hover:bg-black hover:text-white"
              >
                Consultar por WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </main>

      {/* 6. LIGHTBOX (Modal para ver fotos en grande y alta calidad) */}
      <AnimatePresence>
        {imagenModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", cursor: "zoom-out" }}
            onClick={() => setImagenModal(null)} // Cerrar al clickear fondo
          >
            {/* Botón cerrar */}
            <button style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "white", fontSize: "30px", cursor: "pointer" }}>✕</button>
            
            <motion.img 
              src={imagenModal} 
              alt="Producto en grande"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain", boxShadow: "0 0 50px rgba(0,0,0,0.5)", border: "2px solid white" }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. BOTÓN WHATSAPP FLOTANTE (Minimalista) */}
      <a 
        href="https://wa.me/5492236325321" 
        target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: "40px", right: "40px", backgroundColor: "white", padding: "18px", borderRadius: "50%", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", zIndex: 90, transition: "transform 0.3s ease" }}
        className="hover:scale-110"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          style={{ width: "26px", height: "26px", opacity: 0.6 }} 
          alt="WhatsApp Garuga" 
        />
      </a>

      {/* 8. FOOTER ELIMINADO PARA MÁXIMO MINIMALISMO */}

    </div>
  );
}