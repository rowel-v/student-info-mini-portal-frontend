import type { FC } from "react";

interface LoadingDialogProps {
  open: boolean;
  message?: string;
}

const LoadingDialog: FC<LoadingDialogProps> = ({
  open,
  message = "Loading Data...",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
      <div className="bg-gray-700 p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingDialog;
