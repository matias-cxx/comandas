
import { useState, useEffect } from "react";

const pedidosIniciales = [
  { numero: 101, estado: "En preparación" },
  { numero: 102, estado: "En preparación" },
];

export default function LlamadorComandas() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [numeroBusqueda, setNumeroBusqueda] = useState("");

  const marcarComoListo = (numero) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.numero === numero) {
          mostrarNotificacion(`Pedido #${numero} listo para retirar`);
          return { ...p, estado: "Listo para retirar" };
        }
        return p;
      })
    );
  };

  const mostrarNotificacion = (mensaje) => {
    if (Notification.permission === "granted") {
      new Notification(mensaje);
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const pedidoFiltrado = pedidos.find(
    (p) => p.numero.toString() === numeroBusqueda
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Llamador de Comandas</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Buscar estado de pedido</h2>
        <input
          type="text"
          placeholder="Número de pedido"
          className="border p-2 rounded mr-2"
          value={numeroBusqueda}
          onChange={(e) => setNumeroBusqueda(e.target.value)}
        />
        {numeroBusqueda && pedidoFiltrado ? (
          <p className="mt-2">
            Estado: <strong>{pedidoFiltrado.estado}</strong>
          </p>
        ) : numeroBusqueda ? (
          <p className="mt-2 text-red-500">Pedido no encontrado</p>
        ) : null}
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Panel de cocina</h2>
        <ul>
          {pedidos.map((p) => (
            <li
              key={p.numero}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                Pedido <strong>#{p.numero}</strong> - {p.estado}
              </span>
              {p.estado !== "Listo para retirar" && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => marcarComoListo(p.numero)}
                >
                  Marcar como listo
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
