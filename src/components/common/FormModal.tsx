interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const FormModal = ({ isOpen, title, onClose, children }: FormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg text-right">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default FormModal;
