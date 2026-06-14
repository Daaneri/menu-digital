export default function Home() {
  return (
    <main style={{display:'flex',justifyContent:'center',padding:'20px',background:'#111',minHeight:'100vh'}}>
      <div style={{width:'100%',maxWidth:'390px',background:'#fff',borderRadius:'24px',overflow:'hidden',fontFamily:'sans-serif'}}>
        
        <div style={{background:'#1a1a1a',padding:'28px 20px 16px',textAlign:'center'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'16px',background:'#D85A30',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',fontSize:'32px'}}>🥩</div>
          <div style={{fontSize:'20px',fontWeight:'600',color:'#fff',marginBottom:'2px'}}>La Parrilla del Centro</div>
          <div style={{fontSize:'12px',color:'#888'}}>San Martín 450 · Villa Constitución</div>
          <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'10px'}}>
            {['🕐 12:00–23:30','🛵 Delivery','⭐ 4.8'].map(b=>(
              <span key={b} style={{fontSize:'11px',padding:'3px 8px',borderRadius:'20px',background:'rgba(255,255,255,0.1)',color:'#ccc'}}>{b}</span>
            ))}
          </div>
        </div>

        <MenuSection title="🔥 Parrilla" items={[
          {name:'Asado 400g',desc:'Costillar vacuno a la parrilla',price:'$5.800'},
          {name:'Bife de chorizo',desc:'400g, punto a elección',price:'$6.500'},
          {name:'Pollo a la parrilla',desc:'Medio pollo con chimichurri',price:'$4.800'},
          {name:'Vacío',desc:'Corte clásico argentino',price:'$5.500'},
        ]}/>

        <MenuSection title="🫓 Entradas" items={[
          {name:'Empanadas x4',desc:'Carne cortada a cuchillo',price:'$2.800'},
          {name:'Provoleta',desc:'Con orégano y aceite de oliva',price:'$3.200'},
          {name:'Tabla de fiambres',desc:'Selección de fiambres y quesos',price:'$4.500'},
        ]}/>

        <MenuSection title="🥗 Guarniciones" items={[
          {name:'Papas fritas',desc:'Caseras, crocantes',price:'$1.500'},
          {name:'Ensalada mixta',desc:'Lechuga, tomate, cebolla',price:'$1.800'},
          {name:'Verduras grilladas',desc:'Zucchini, morrones, berenjena',price:'$2.000'},
        ]}/>

        <MenuSection title="🌿 Vegetariano" items={[
          {name:'Burger de lentejas',desc:'Con rúcula y tomate asado',price:'$4.200'},
          {name:'Ensalada mediterránea',desc:'Aceitunas, queso, pepino',price:'$3.500'},
        ]}/>

        <MenuSection title="🍮 Postres" items={[
          {name:'Flan casero',desc:'Con dulce de leche y crema',price:'$1.800'},
          {name:'Helado 2 bochas',desc:'Variedad del día',price:'$1.600'},
        ]}/>

        <MenuSection title="🥤 Bebidas" items={[
          {name:'Cerveza artesanal',desc:'Rubia o roja 500ml',price:'$2.200'},
          {name:'Vino copa',desc:'Tinto o blanco',price:'$2.500'},
          {name:'Gaseosa',desc:'Coca, Sprite, Fanta',price:'$1.000'},
        ]}/>

        <div style={{padding:'16px',paddingBottom:'28px'}}>
          <a href="https://wa.me/5493400421234?text=Hola!%20Vi%20el%20men%C3%BA%20y%20quiero%20hacer%20un%20pedido"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:'#25D366',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',fontSize:'15px',fontWeight:'500'}}>
            📲 Hacer pedido por WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}

type Item = {name: string, desc: string, price: string}

function MenuSection({title, items}: {title: string, items: Item[]}) {
  return (
    <div style={{padding:'16px 16px 0'}}>
      <div style={{fontSize:'14px',fontWeight:'600',color:'#333',marginBottom:'10px'}}>{title}</div>
      {items.map(item=>(
        <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
          <div>
            <div style={{fontSize:'13px',fontWeight:'500',color:'#222'}}>{item.name}</div>
            <div style={{fontSize:'11px',color:'#888',marginTop:'2px'}}>{item.desc}</div>
          </div>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#D85A30',flexShrink:0,marginLeft:'12px'}}>{item.price}</div>
        </div>
      ))}
      <div style={{height:'16px'}}/>
    </div>
  )
}