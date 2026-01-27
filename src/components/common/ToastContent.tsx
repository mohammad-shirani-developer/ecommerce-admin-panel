interface Props {
  title: string;
  message?: string;
}

const ToastContent = ({ title, message }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">{title}</span>
      {message && <span className="text-sm opacity-90">{message}</span>}
    </div>
  );
};

export default ToastContent;
