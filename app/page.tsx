'use client';
import { useState } from 'react';

type Item = {name: string, desc: string, price: number, emoji: string}
type CartItem = Item & {qty: number}

const MENU: {title: string, items: Item[]}[] = [
  {title:'🔥 Parrilla', items:[
    {name:'Asado 400g',desc:'Costillar vacuno a la parrilla',price:5800,emoji:'🥩'},
    {name:'Bife de chorizo',desc:'400g, punto a elección',price:6500,emoji:'🥩'},
    {name:'Pollo a la parrilla',desc:'Medio pollo con chimichurri',price:4800,emoji:'🍗'},
    {name:'Vacío',desc:'Corte clásico argentino',price:5500,emoji:'🥩'},
  ]},
  {title:'🫓 Entradas', items:[
    {name:'Empanadas x4',desc:'Carne cortada a cuchillo',price:2800,emoji:'🫓'},
    {name:'Provoleta',desc:'Con orégano y aceite de oliva',price:3200,emoji:'🧀'},
    {name:'Tabla de fiambres',desc:'Selección de fiambres y quesos',price:4500,emoji:'🍖'},
  ]},
  {title:'🥗 Guarniciones', items:[
    {name:'Papas fritas',desc:'Caseras, crocantes',price:1500,emoji:'🍟'},
    {name:'Ensalada mixta',desc:'Lechuga, tomate, cebolla',price:1800,emoji:'🥗'},
    {name:'Verduras grilladas',desc:'Zucchini, morrones, berenjena',price:2000,emoji:'🥦'},
  ]},
  {title:'🌿 Vegetariano', items:[
    {name:'Burger de lentejas',desc:'Con rúcula y tomate asado',price:4200,emoji:'🍔'},
    {name:'Ensalada mediterránea',desc:'Aceitunas, queso, pepino',price:3500,emoji:'🥗'},
  ]},
  {title:'🍮 Postres', items:[
    {name:'Flan casero',desc:'Con dulce de leche y crema',price:1800,emoji:'🍮'},
    {name:'Helado 2 bochas',desc:'Variedad del día',price:1600,emoji:'🍦'},
  ]},
  {title:'🥤 Bebidas', items:[
    {name:'Cerveza artesanal',desc:'Rubia o roja 500ml',price:2200,emoji:'🍺'},
    {name:'Vino copa',desc:'Tinto o blanco',price:2500,emoji:'🍷'},
    {name:'Gaseosa',desc:'Coca, Sprite, Fanta',price:1000,emoji:'🥤'},
  ]},
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  function addItem(item: Item) {
    setCart(prev => {
      const ex = prev.find(i=>i.name===item.name);
      if(ex) return prev.map(i=>i.name===item.name?{...i,qty:i.qty+1}:i);
      return [...prev, {...item, qty:1}];
    });
  }

  function removeItem(name: string) {
    setCart(prev => prev.map(i=>i.name===name?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));
  }

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  function sendWA() {
    let msg = '¡Hola! Quiero hacer un pedido:\n\n';
    cart.forEach(i=>{msg+=`• ${i.qty}x ${i.name} — $${(i.price*i.qty).toLocaleString('es-AR')}\n`;});
    msg+=`\n*Total: $${total.toLocaleString('es-AR')}*`;
    window.open('https://wa.me/5493400421234?text='+encodeURIComponent(msg));
  }

  return (
    <main style={{display:'flex',justifyContent:'center',background:'#111',minHeight:'100vh'}}>
      <div style={{width:'100%',maxWidth:'390px',background:'#fff',fontFamily:'sans-serif',position:'relative'}}>

        {/* Hero */}
        <div style={{background:'#1a1a1a',padding:'28px 20px 16px',textAlign:'center'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'16px',background:'#D85A30',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',fontSize:'32px'}}>🥩</div>
          <div style={{fontSize:'20px',fontWeight:'600',color:'#fff',marginBottom:'2px'}}>La Parrilla del Centro</div>
          <div style={{fontSize:'12px',color:'#888'}}>San Martín 450 · Villa Constitución</div>
          <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'10px',flexWrap:'wrap'}}>
            {['🕐 12:00–23:30','🛵 Delivery','⭐ 4.8'].map(b=>(
              <span key={b} style={{fontSize:'11px',padding:'3px 8px',borderRadius:'20px',background:'rgba(255,255,255,0.1)',color:'#ccc'}}>{b}</span>
            ))}
          </div>
        </div>

        {/* Menu */}
        {!showCart && (
          <div style={{paddingBottom:'80px'}}>
            {MENU.map(section=>(
              <div key={section.title} style={{padding:'16px 16px 0'}}>
                <div style={{fontSize:'14px',fontWeight:'600',color:'#333',marginBottom:'10px'}}>{section.title}</div>
                {section.items.map(item=>{
                  const inCart = cart.find(i=>i.name===item.name);
                  return (
                    <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                        <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{item.emoji}</div>
                        <div>
                          <div style={{fontSize:'13px',fontWeight:'500',color:'#222'}}>{item.name}</div>
                          <div style={{fontSize:'11px',color:'#888',marginTop:'2px'}}>{item.desc}</div>
                          <div style={{fontSize:'13px',fontWeight:'600',color:'#D85A30',marginTop:'3px'}}>${item.price.toLocaleString('es-AR')}</div>
                        </div>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
                        {inCart && <>
                          <button onClick={()=>removeItem(item.name)} style={{width:'28px',height:'28px',borderRadius:'8px',border:'1px solid #ddd',background:'#fff',fontSize:'16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                          <span style={{fontSize:'14px',fontWeight:'500',minWidth:'16px',textAlign:'center'}}>{inCart.qty}</span>
                        </>}
                        <button onClick={()=>addItem(item)} style={{width:'28px',height:'28px',borderRadius:'8px',background:'#D85A30',border:'none',color:'#fff',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                      </div>
                    </div>
                  );
                })}
                <div style={{height:'8px'}}/>
              </div>
            ))}
          </div>
        )}

        {/* Cart view */}
        {showCart && (
          <div style={{padding:'16px',paddingBottom:'80px'}}>
            <button onClick={()=>setShowCart(false)} style={{background:'none',border:'none',color:'#D85A30',fontSize:'14px',cursor:'pointer',marginBottom:'16px',padding:'0'}}>← Volver al menú</button>
            <div style={{fontSize:'16px',fontWeight:'600',marginBottom:'16px'}}>Tu pedido</div>
            {cart.length===0 && <div style={{textAlign:'center',color:'#888',padding:'32px',fontSize:'14px'}}>No agregaste nada todavía</div>}
            {cart.map(item=>(
              <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div>
                  <div style={{fontSize:'13px',fontWeight:'500'}}>{item.qty}x {item.name}</div>
                  <div style={{fontSize:'12px',color:'#888'}}>${item.price.toLocaleString('es-AR')} c/u</div>
                </div>
                <div style={{fontSize:'13px',fontWeight:'600',color:'#D85A30'}}>${(item.price*item.qty).toLocaleString('es-AR')}</div>
              </div>
            ))}
            {cart.length>0 && (
              <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0',fontWeight:'600',fontSize:'15px'}}>
                <span>Total</span>
                <span style={{color:'#D85A30'}}>${total.toLocaleString('es-AR')}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'390px',padding:'10px 16px',background:'#fff',borderTop:'1px solid #f0f0f0',display:'flex',gap:'8px'}}>
          <button onClick={()=>setShowCart(!showCart)} style={{flex:1,background:'#1a1a1a',color:'#fff',border:'none',borderRadius:'10px',padding:'12px',fontSize:'14px',fontWeight:'500',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
            🛒 Ver pedido {count>0 && <span style={{background:'#D85A30',color:'#fff',borderRadius:'20px',padding:'1px 7px',fontSize:'12px'}}>{count}</span>}
          </button>
          {cart.length>0 && (
            <button onClick={sendWA} style={{flex:1,background:'#25D366',color:'#fff',border:'none',borderRadius:'10px',padding:'12px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>
              📲 Pedir por WA
            </button>
          )}
        </div>

      </div>
    </main>
  );
}