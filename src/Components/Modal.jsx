import React from "react";

function Modal({ show, children, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal content */}
      <div className="relative w-[95%] max-w-4xl h-[90vh] bg-white  overflow-auto p-5 rounded-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}

export default Modal;
