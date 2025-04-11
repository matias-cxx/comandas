import { useState, useEffect } from "react";

const pedidosIniciales = [
  { numero: 101, estado: "En preparación" },
  { numero: 102, estado: "En preparación" },
];

export default function LlamadorComandas() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [numeroBusqueda, setNumeroBusqueda] = useState("");
  const [nuevoPedido, setNuevoPedido] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const sonidoRef = new Audio("/notificacion.mp3");

  const reproducirSonido = () => {
    sonidoRef.play().catch((e) => console.error("Error al reproducir sonido:", e));
  };

  const marcarComoListo = (numero) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.numero === numero) {
          mostrarNotificacion(`Pedido #${numero} listo para retirar`);
          reproducirSonido();
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

  const agregarPedido = () => {
    const numero = parseInt(nuevoPedido);
    if (isNaN(numero)) {
      setMensajeError("Ingrese un número válido");
      return;
    }
    if (pedidos.some((p) => p.numero === numero)) {
      setMensajeError("El número de pedido ya existe");
      return;
    }
    setPedidos([...pedidos, { numero, estado: "En preparación" }]);
    setNuevoPedido("");
    setMensajeError("");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Llamador de Comandas</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Buscar estado de pedido</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Número de pedido"
            className="border p-2 rounded w-full md:w-auto"
            value={numeroBusqueda}
            onChange={(e) => setNumeroBusqueda(e.target.value)}
          />
        </div>
        {numeroBusqueda && pedidoFiltrado ? (
          <p className="mt-2">
            Estado: <strong>{pedidoFiltrado.estado}</strong>
          </p>
        ) : numeroBusqueda ? (
          <p className="mt-2 text-red-500">Pedido no encontrado</p>
        ) : null}
      </div>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Agregar nuevo pedido</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Ej: 103"
            className="border p-2 rounded w-full md:w-auto"
            value={nuevoPedido}
            onChange={(e) => setNuevoPedido(e.target.value)}
          />
          <button
            onClick={agregarPedido}
            className="bg-blue-500 text-white px-3 py-2 rounded w-full md:w-auto"
          >
            Agregar pedido
          </button>
        </div>
        {mensajeError && <p className="text-red-500 mt-2">{mensajeError}</p>}
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Panel de cocina</h2>
        <ul>
          {pedidos.map((p) => (
            <li
              key={p.numero}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-2 gap-2"
            >
              <span>
                Pedido <strong>#{p.numero}</strong> - {p.estado}
              </span>
              {p.estado !== "Listo para retirar" && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded w-full md:w-auto"
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


