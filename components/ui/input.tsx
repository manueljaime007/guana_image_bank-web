interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full h-12 rounded-lg
        bg-white/5 border border-white/10
        px-4 text-sm text-white
        placeholder:text-white/40
        focus:outline-none focus:border-cyan-400
        transition
        ${className}
      `}
    />
  );
}