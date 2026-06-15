'use client';
import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

const MENU = [
  { section: 'Parrilla', items: [{ name: 'Asado 400g', price: 5800, desc: 'Costillar a las brasas, cocción lenta.' }, { name: 'Bife de Chorizo', price: 6500, desc: '400g, punto a elección, chimichurri.' }] },
  { section: 'Entradas', items: [{ name: 'Empanadas x4', price: 2800, desc: 'Carne cortada a cuchillo, masa artesanal.' }] }
];

export default function MenuPage() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const update = (name: string, delta: number) => {
    setCart(prev => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) + delta) }));
  };

  return (
    <div className="min-h-screen bg-[#EBE6E0] p-6 flex justify-center font-serif text-[#2C2420]">
      <div className="w-full max-w-[400px] border border-[#C9C3BC] bg-[#F4EFE9] p-8 shadow-[10px_10px_0px_0px_rgba(44,36,32,0.1)]">
        
        {/* Header con estilo de imprenta */}
        <header className="text-center mb-12 border-b-2 border-[#8B4513] pb-6">
          <h1 className="text-5xl uppercase tracking-tighter text-[#8B4513] leading-none mb-2">La Parrilla<br/>del Centro</h1>
          <p className="text-sm uppercase tracking-widest text-[#8B4513]/70">Villa Constitución</p>
        </header>

        {/* Menú */}
        {MENU.map((sec) => (
          <section key={sec.section} className="mb-10">
            <h2 className="text-2xl font-bold uppercase border-b border-[#8B4513]/20 mb-6 pb-2">{sec.section}</h2>
            <div className="space-y-6">
              {sec.items.map((it) => (
                <div key={it.name} className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{it.name}</h3>
                    <p className="text-xs text-[#2C2420]/60 italic">{it.desc}</p>
                    <span className="block font-bold text-[#8B4513] mt-1">$ {it.price.toLocaleString()}</span>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex items-center gap-2 bg-[#EBE6E0] border border-[#C9C3BC] p-1">
                    <button onClick={() => update(it.name, -1)} className="p-1 hover:bg-[#8B4513] hover:text-white"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm">{cart[it.name] || 0}</span>
                    <button onClick={() => update(it.name, 1)} className="p-1 hover:bg-[#8B4513] hover:text-white"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-[#2C2420]">
          <button className="w-full bg-[#2C2420] text-[#F4EFE9] py-4 uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#8B4513] transition-colors">
            <ShoppingBag size={18} />
            Hacer Pedido
          </button>
        </footer>
      </div>
    </div>
  );
}