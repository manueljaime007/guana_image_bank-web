interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className="block mb-2 text-sm text-white/70">
      {children}
    </label>
  );
}
