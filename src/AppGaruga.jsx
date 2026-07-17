// src/AppGaruga.jsx
import React, { useState } from 'react';

// Datos de los productos (Tus productos de siempre + los 4 combos nuevos integrados de forma limpia)
const catalog = [
  // --- VELAS DE SOJA ---
  {
    id: "roma",
    nombre: "Vela Roma -- 100 cc",
    precio: "$6.000",
    descripcion: "Hecha a mano con cera de soja 100% natural en envase de vidrio.",
    imagen: "/productos/roma.jpg",
    aromas: ["Bamboo", "Papaya", "Pepino-Sandía"],
    stockInmediato: true
  },
  {
    id: "lata",
    nombre: "Vela Lata -- 100 cc",
    precio: "$7.500",
    descripcion: "Contenedor de lata metálica con tapa integrada.",
    imagen: "/productos/lata.jpg",
    aromas: ["Limón", "Tilo-Jazmín"],
    stockInmediato: true
  },
  {
    id: "amanecer",
    nombre: "Vela Amanecer -- 150 cc",
    precio: "$8.000",
    descripcion: "Envase intermedio con gran persistencia aromática.",
    imagen: "/productos/amanecer.jpg",
    aromas: ["Vainilla", "Limón", "Papaya"],
    stockInmediato: true
  },
  {
    id: "hexagonal",
    nombre: "Vela Hexagonal -- 150 cc",
    precio: "$8.000",
    descripcion: "Frasco de vidrio geométrico elegante.",
    imagen: "/productos/hexagonal.jpg",
    aromas: ["Limón", "Tilo-Jazmín", "Papaya"],
    stockInmediato: true
  },
  {
    id: "olivia",
    nombre: "Vela Olivia -- 180 cc",
    precio: "$9.500",
    descripcion: "Frasco premium con tapa de madera o corcho protector.",
    imagen: "/productos/olivia.jpg",
    aromas: ["Coco", "Vainilla"],
    stockInmediato: true
  },
  {
    id: "cuenco",
    nombre: "Vela Cuenco de madera -- 100 cc",
    precio: "$10.000",
    descripcion: "Estilo rústico, cuenco torneado ideal para decoración.",
    imagen: "/productos/cuenco.jpg",
    aromas: ["Coco", "Bamboo"],
    stockInmediato: true
  },
  {
    id: "caramelera",
    nombre: "Vela Caramelera -- 80 cc",
    precio: "$11.000",
    descripcion: "Vidrio labrado delicado, objeto de diseño y distinción.",
    imagen: "/productos/caramelera.jpg",
    aromas: ["A pedido / Personalizado"],
    stockInmediato: false
  },
  {
    id: "rune",
    nombre: "Vela Rune -- 200 cc",
    precio: "$12.500",
    descripcion: "La más grande del taller, doble pabilo para máxima intensidad.",
    imagen: "/productos/rune.jpg",
    aromas: ["Coco", "Vainilla", "Bamboo", "Pepino-Sandía"],
    stockInmediato: true
  },

  // --- NUEVO: COMBOS DÍA DEL AMIGO (Integrados fluidamente en la lista) ---
  {
    id: "combo-1",
    nombre: "Combo 1 - Kit Pintura Tray Chica",
    precio: "$6.000",
    descripcion: "Bandeja chica de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4. ¡Ideal para regalar un momento creativo!",
    imagen: "/productos/combo1.png",
    aromas: ["Sin aroma (Kit Yeso)"],
    stockInmediato: true
  },
  {
    id: "combo-2",
    nombre: "Combo 2 - Kit Pintura Cuenco Flor",
    precio: "$6.000",
    descripcion: "Cuenco flor de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4. Un regalo interactivo y súper estético.",
    imagen: "/productos/combo2.png",
    aromas: ["Sin aroma (Kit Yeso)"],
    stockInmediato: true
  },
  {
    id: "combo-3",
    nombre: "Combo 3 - Kit Pintura Tray Grande",
    precio: "$8.000",
    descripcion: "Bandeja grande de yeso + 3 colores acrílicos de 3 ml a elección + laca 3 ml + pincel n°4.",
    imagen: "/productos/combo3.png",
    aromas: ["Sin aroma (Kit Yeso)"],
    stockInmediato: true
  },
  {
    id: "combo-4",
    nombre: "Vela Amistad & Difusor Especial",
    precio: "$12.000",
    descripcion: "Vela de soja especial 'Amistad' con doble pabilo y esencia a elección o Difusor de vidrio con varillas y esencia a elección ($12.000). Coincidir en el tiempo, elegir acompañarse.",
    imagen: "/productos/combo4.png",
    aromas: ["Bamboo", "Vainilla", "Coco", "Papaya", "Tilo-Jazmín", "Pepino-Sandía", "Madera y Cuero"],
    stockInmediato: false
  },

  // --- DIFUSORES ---
  {
    id: "difusor-ambar",
    nombre: "Difusor Ámbar 125 ml",
    precio: "$12.000",
    descripcion: "Envase ámbar protector con varillas de bambú.",
    imagen: "/productos/ambar.jpg",
    aromas: ["Limón", "Pepino-Sandía", "Cuero y Madera"],
    stockInmediato: true
  },
  {
    id: "difusor-cristal",
    nombre: "Difusor Cristal 125 ml",
    precio: "$12.000",
    descripcion: "Envase minimalista transparente con varillas de alta absorción.",
    imagen: "/productos/cristal.jpg",
    aromas: ["Limón", "Papaya", "Pepino-Sandía"],
    stockInmediato: true
  },

  // --- PERFUMINAS ---
  {
    id: "perfumina-250",
    nombre: "Perfumina 250 ml",
    precio: "$12.000",
    descripcion: "Home spray de alta concentración para textiles y ambientes.",
    imagen: "/productos/perfumina250.jpg",
    aromas: ["A pedido / Personalizado"],
    stockInmediato: false
  },
  {
    id: "perfumina-500",
    nombre: "Perfumina 500 ml",
    precio: "$20.000",
    descripcion: "Presentación familiar para mantener la frescura de tu hogar.",
    imagen: "/productos/perfumina500.jpg",
    aromas: ["A pedido / Personalizado"],
    stockInmediato: false
  }
];

export default function AppGaruga() {
  const [cart, setCart] = useState([]);
  const [aromaSelections, setAromaSelections] = useState({});
  const [deliveryInfo, setDeliveryInfo] = useState({ cp: '', localidad: '', direccion: '' });

  const handleAromaChange = (productId, aroma) => {
    setAromaSelections(prev => ({ ...prev, [productId]: aroma }));
  };

  const addToCart = (product) => {
    const selectedAroma = aromaSelections[product.id] || product.aromas[0];
    const existingIndex = cart.findIndex(item => item.id === product.id && item.aroma === selectedAroma);

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].cantidad += 1;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        aroma: selectedAroma,
        cantidad: 1
      }]);
    }
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].cantidad += delta;
    if (newCart[index].cantidad <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const iniciarPagoMercadoPago = async () => {
    if (!deliveryInfo.cp || !deliveryInfo.localidad) {
      alert("Por favor, completá tu Código Postal y Localidad para calcular el envío.");
      return;
    }

    try {
      const respuesta = await fetch('/api/crear-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: cart, datosEnvio: deliveryInfo })
      });

      const data = await respuesta.json();

      if (data.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("Hubo un problema al conectar con Mercado Pago. Intentá de nuevo.");
      }
    } catch (error) {
      console.error("Error en el flujo de pago:", error);
      alert("Error de conexión con el servidor de cobros.");
    }
  };

  const enviarPorWhatsApp = () => {
    if (cart.length === 0) return;
    let mensaje = "Hola Garuga! 🕯️ Quiero hacer el siguiente pedido:\n\n";
    cart.forEach(item => {
      mensaje += `- ${item.nombre} (${item.aroma}) x${item.cantidad}\n`;
    });
    mensaje += `\n📍 Envío a: CP ${deliveryInfo.cp}, ${deliveryInfo.localidad}, ${deliveryInfo.direccion || 'Retiro en sucursal'}`;
    
    window.open(`https://wa.me/5492236325321?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FAF6F0', color: '#4B3F35', fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', padding: '20px' }}>
      
      {/* HEADER DE LA TIENDA (Idéntico al original) */}
      <header style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '2px', margin: '0 0 10px 0' }}>GARUGA</h1>
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#7c6a59' }}>Aromas que transforman tus rincones favoritos</p>
      </header>

      {/* BANNER DE BIENVENIDA (Limpio y unificado) */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px auto', padding: '20px', border: '1px solid #E3D5CA', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h3 style={{ marginTop: 0, fontWeight: 'bold' }}>¡Bienvenidos a Garuga! 🕯️</h3>
        <p>Creamos velas de cera de soja y aromas pensados para abrazar tus ambientes cotidianos.</p>
        <hr style={{ border: '0', borderTop: '1px solid #E3D5CA', margin: '15px 0' }} />
        <p style={{ fontSize: '0.95rem' }}>
          🎁 <strong>ESPECIAL DÍA DEL AMIGO:</strong> ¡Lanzamos nuestros combos interactivos! Pintá tu propia bandeja o cuenco de yeso en casa y regalá un momento súper especial y duradero.
        </p>
        <p style={{ fontSize: '0.9rem', margin: '10px 0 0 0' }}>
          ✨ <strong>Stock Inmediato:</strong> Despacho en 24/48 hs. <br />
          🛠️ <strong>A pedido:</strong> Si elegís un producto personalizado, el proceso de fabricación manual demora 7 días hábiles.
        </p>
      </div>

      {/* LISTADO DE TODOS LOS PRODUCTOS DE CORRIDO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {catalog.map(product => {
          const selectedAroma = aromaSelections[product.id] || product.aromas[0];
          return (
            <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E3D5CA', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '300px', backgroundColor: '#f0f0f0', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={product.imagen} 
                  alt={product.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=300&auto=format&fit=crop"; }}
                />
                {!product.stockInmediato && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#E3D5CA', color: '#4B3F35', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    A pedido (7 días)
                  </span>
                )}
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.nombre}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#666', lineHeight: '1.4', flexGrow: 1 }}>{product.descripcion}</p>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4B3F35', marginBottom: '15px', display: 'block' }}>{product.precio}</span>
                
                {product.aromas.length > 1 && (
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Elegí el Aroma:</label>
                    <select 
                      value={selectedAroma}
                      onChange={(e) => handleAromaChange(product.id, e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #E3D5CA', color: '#4B3F35', backgroundColor: '#FAF6F0', cursor: 'pointer' }}
                    >
                      {product.aromas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                )}

                <button 
                  onClick={() => addToCart(product)}
                  style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#4B3F35', color: '#FAF6F0', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#655546'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4B3F35'}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CARRITO DE COMPRAS */}
      {cart.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '50px auto 0 auto', padding: '25px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #4B3F35', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', borderBottom: '2px solid #E3D5CA', paddingBottom: '10px' }}>🛒 Tu Carrito de Compra</h3>
          <div>
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.aroma}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #FAF6F0' }}>
                <div>
                  <strong style={{ display: 'block' }}>{item.nombre}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#7c6a59' }}>Aroma: {item.aroma}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQuantity(index, -1)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E3D5CA', backgroundColor: '#FAF6F0', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: 'bold' }}>{item.cantidad}</span>
                  <button onClick={() => updateQuantity(index, 1)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E3D5CA', backgroundColor: '#FAF6F0', cursor: 'pointer' }}>+</button>
                  <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>{item.precio}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#FAF6F0', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}>📦 Datos para el Envío</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input 
                type="text" 
                placeholder="Código Postal" 
                value={deliveryInfo.cp}
                onChange={(e) => setDeliveryInfo(prev => ({ ...prev, cp: e.target.value }))}
                style={{ width: '35%', padding: '8px', borderRadius: '6px', border: '1px solid #E3D5CA' }}
              />
              <input 
                type="text" 
                placeholder="Localidad" 
                value={deliveryInfo.localidad}
                onChange={(e) => setDeliveryInfo(prev => ({ ...prev, localidad: e.target.value }))}
                style={{ width: '65%', padding: '8px', borderRadius: '6px', border: '1px solid #E3D5CA' }}
              />
            </div>
            <input 
              type="text" 
              placeholder="Dirección (Calle, número, piso/depto)" 
              value={deliveryInfo.direccion}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, direccion: e.target.value }))}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #E3D5CA' }}
            />
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={iniciarPagoMercadoPago}
              style={{ width: '100%', padding: '15px', border: 'none', borderRadius: '8px', backgroundColor: '#009EE3', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              💳 Pagar de forma segura con Mercado Pago
            </button>
            <button 
              onClick={enviarPorWhatsApp}
              style={{ width: '100%', padding: '12px', border: '1px solid #25D366', borderRadius: '8px', backgroundColor: '#fff', color: '#25D366', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              💬 Coordinar pedido y Transferencia por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
