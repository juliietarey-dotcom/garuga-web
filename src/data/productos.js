// Base de datos de GARUGA - Productos y Esencias
// Tip de ingeniería: Para controlar el stock inmediato, usá el formato "Aroma": Cantidad (número).
// Si ponés 0 o dejás las llaves vacías {}, figurará como "Agotado" en la pestaña de Stock Disponible.

export const esenciasGlobales = ["Vainilla", "Coco", "Bamboo", "Limón", "Papaya", "Pepino-Sandía", "Tilo-Jazmín", "Peonías", "Cuero y Madera"];

export const productosData = [
  // --- VELAS DE SOJA ---
  { 
    categoria: "velas de soja", 
    nombre: "Vela Roma -- 100 cc", 
    precio: "$6000", 
    desc: "Esencia a elección", 
    img: "/productos/roma.jpg", 
    variantesStock: { "Bamboo": 1, "Papaya": 1, "Pepino-Sandía": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Lata -- 100 cc", 
    precio: "$7500", 
    desc: "Esencia a elección", 
    img: "/productos/lata.jpg", 
    variantesStock: { "Limón": 1, "Tilo-Jazmín": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Amanecer -- 150 cc", 
    precio: "$8000", 
    desc: "Esencia a elección", 
    img: "/productos/amanecer.jpg", 
    variantesStock: { "Vainilla": 1, "Limón": 1, "Papaya": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Hexagonal -- 150 cc", 
    precio: "$8000", 
    desc: "Esencia a elección", 
    img: "/productos/hexagonal.jpg", 
    variantesStock: { "Limón": 1, "Tilo-Jazmín": 1, "Papaya": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Olivia -- 180 cc", 
    precio: "$9500", 
    desc: "Esencia a elección", 
    img: "/productos/olivia.jpg", 
    variantesStock: { "Coco": 1, "Vainilla": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Cuenco de madera -- 100 cc", 
    precio: "$10000", 
    desc: "Esencia a elección", 
    img: "/productos/cuenco.jpg", 
    variantesStock: { "Coco": 1} 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Caramelera -- 80 cc", 
    precio: "$11000", 
    desc: "Esencia a elección", 
    img: "/productos/caramelera.jpg", 
    variantesStock: {} // Sin stock inmediato actual
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Rune -- 200 cc", 
    precio: "$12500", 
    desc: "Esencia a elección", 
    img: "/productos/rune.jpg", 
    variantesStock: { "Coco": 1, "Vainilla": 1, "Bamboo": 1, "Pepino-Sandía": 1 } 
  },
  
  // --- DIFUSORES ---
  { 
    categoria: "difusores", 
    nombre: "Difusor Ámbar 125 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/ambar.jpg", 
    variantesStock: { "Limón": 1, "Pepino-Sandía": 1, "Cuero y Madera": 1 } 
  },
  { 
    categoria: "difusores", 
    nombre: "Difusor Cristal 125 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/cristal.jpg", 
    variantesStock: { "Limón": 1, "Papaya": 1, "Pepino-Sandía": 1 } 
  },

  // --- PERFUMINAS ---
  { 
    categoria: "perfuminas", 
    nombre: "Perfumina 250 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/perfumina250.jpg", 
    variantesStock: {} // Sin stock inmediato actual
  },
  { 
    categoria: "perfuminas", 
    nombre: "Perfumina 500 ml", 
    precio: "$20000", 
    desc: "Esencia a elección", 
    img: "/productos/perfumina500.jpg", 
    variantesStock: {} // Sin stock inmediato actual
  }
];
