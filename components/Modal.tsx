import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes zoom-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in {
            animation: zoom-in 0.3s ease-out forwards;
        }
      `}</style>
      <div 
        className="relative max-w-4xl max-h-[90vh] bg-surface rounded-lg shadow-2xl p-2 animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Enlarged mood board" className="w-full h-full object-contain rounded-md" style={{ maxHeight: '85vh' }}/>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 h-10 w-10 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Modal;