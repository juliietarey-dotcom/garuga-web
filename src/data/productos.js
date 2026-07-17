// Base de datos de GARUGA - Productos y Esencias
// Tip de ingeniería: Para controlar el stock inmediato, usá el formato "Aroma": Cantidad (número).
// Si ponés 0 o dejás las llaves vacías {}, figurará como "Agotado" en la pestaña de Stock Disponible.

export const esenciasGlobales = [
  "Vainilla", 
  "Coco", 
  "Bamboo", 
  "Limón", 
  "Papaya", 
  "Pepino-Sandía", 
  "Tilo-Jazmín", 
  "Peonías", 
  "Cuero y Madera",
  "Cherry", 
  "Coco-Vainilla", 
  "Frambuesa-Pimienta rosa"
];

export const productosData = [
  // --- DÍA DEL AMIGO (COMBOS) ---
  { 
    categoria: "dia del amigo", 
    nombre: "Combo 1 ", 
    precio: "$6000", 
    desc: "Bandeja chica de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4. ¡Regalá un momento creativo!", 
    img: "/productos/combo1.png", 
    variantesStock: {  } 
  },
  { 
    categoria: "dia del amigo", 
    nombre: "Combo 2 ", 
    precio: "$6000", 
    desc: "Cuenco flor de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4. Un regalo interactivo y estético.", 
    img: "/productos/combo2.png", 
    variantesStock: {  } 
  },
  { 
    categoria: "dia del amigo", 
    nombre: "Combo 3 ", 
    precio: "$8000", 
    desc: "Bandeja grande de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4.", 
    img: "/productos/combo3.png", 
    variantesStock: {  } 
  },
  { 
    categoria: "dia del amigo", 
    nombre: "Vela Amistad & Difusor Especial", 
    precio: "$12000", 
    desc: "Vela de soja especial 'Amistad' de doble pabilo o difusor con varillas y esencia a elección. Coincidir en el tiempo, elegir acompañarse. $12.000 cada producto", 
    img: "/productos/combo4.png", 
    variantesStock: {  } 
  },

  // --- VELAS DE SOJA ---
  { 
    categoria: "velas de soja", 
    nombre: "Vela Roma -- 100 cc", 
    precio: "$6000", 
    desc: "Esencia a elección", 
    img: "/productos/roma.jpg", 
    variantesStock: {  } 
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
    variantesStock: {  "Limón": 1, "Papaya": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Hexagonal -- 150 cc", 
    precio: "$8000", 
    desc: "Esencia a elección", 
    img: "/productos/hexagonal.jpg", 
    variantesStock: { "Limón": 1, "Papaya": 1 } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Olivia -- 180 cc", 
    precio: "$9500", 
    desc: "Esencia a elección", 
    img: "/productos/olivia.jpg", 
    variantesStock: {  } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Cuenco de madera -- 100 cc", 
    precio: "$10000", 
    desc: "Esencia a elección", 
    img: "/productos/cuenco.jpg", 
    variantesStock: { } 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Caramelera -- 80 cc", 
    precio: "$11000", 
    desc: "Esencia a elección", 
    img: "/productos/caramelera.jpg", 
    variantesStock: {} 
  },
  { 
    categoria: "velas de soja", 
    nombre: "Vela Rune -- 200 cc", 
    precio: "$12500", 
    desc: "Esencia a elección", 
    img: "/productos/rune.jpg", 
    variantesStock: {  "Vainilla": 1, "Bamboo": 1 } 
  },
  
  // --- DIFUSORES ---
  { 
    categoria: "difusores", 
    nombre: "Difusor Ámbar 125 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/ambar.jpg", 
    variantesStock: {  } 
  },
  { 
    categoria: "difusores", 
    nombre: "Difusor Cristal 125 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/cristal.jpg", 
    variantesStock: { "Limón": 1 } 
  },

  // --- PERFUMINAS ---
  { 
    categoria: "perfuminas", 
    nombre: "Perfumina 250 ml", 
    precio: "$12000", 
    desc: "Esencia a elección", 
    img: "/productos/perfumina250.jpg", 
    variantesStock: {} 
  },
  { 
    categoria: "perfuminas", 
    nombre: "Perfumina 500 ml", 
    precio: "$20000", 
    desc: "Esencia a elección", 
    img: "/productos/perfumina500.jpg", 
    variantesStock: {} 
  }
];
