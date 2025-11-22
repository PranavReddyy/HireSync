import { useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      icon: CheckCircleIcon
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: ExclamationCircleIcon
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      icon: InformationCircleIcon
    }
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} backdrop-blur-xl border rounded-xl p-4 shadow-2xl animate-slide-up flex items-start gap-3 min-w-[320px] max-w-md`}>
      <Icon className={`w-5 h-5 ${style.text} shrink-0 mt-0.5`} />
      <p className={`flex-1 text-sm ${style.text} font-medium`}>{message}</p>
      <button
        onClick={onClose}
        className={`${style.text} hover:text-white transition-colors shrink-0`}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
