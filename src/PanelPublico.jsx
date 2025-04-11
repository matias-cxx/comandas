import { useEffect, useState } from "react";

const pedidosIniciales = [
  { numero: 101, estado: "Listo para retirar" },
  { numero: 102, estado: "En preparación" },
];

export default function PanelPublico() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);

  useEffect(() => {
    const intervalo = setInterval(() => {
      // En el futuro podrías actualizar los pedidos desde algún backend
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const pedidosListos = pedidos.filter(p => p.estado === "Listo para retirar");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Pedidos Listos 🛎️</h1>
      {pedidosListos.length === 0 ? (
        <p className="text-xl">Todavía no hay pedidos listos</p>
      ) : (
        <ul className="text-3xl space-y-4">
          {pedidosListos.map((p) => (
            <li key={p.numero} className="bg-green-600 px-6 py-3 rounded-lg shadow-lg">
              Pedido #{p.numero}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
