// Skeleton para las filas de la tabla
export const TableSkeleton = () => (
  <tr className="animate-pulse border-b">
    <td className="p-4"><div className="w-20 h-14 bg-gray-200 rounded-lg"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-100 rounded w-1/2"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
    <td className="p-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
    <td className="p-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
  </tr>
);

// Modal de Confirmación Genérico
export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">Cancelar</button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2 text-white rounded-xl font-semibold transition ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
// src/components/AdminUi.jsx (Agregá este componente)
export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
    <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-100 rounded w-1/2 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-200 rounded w-20"></div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);