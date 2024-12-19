function Checkbox({ className = '', ...props }) {
  return (
    <input
      type="checkbox"
      className={`h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    />
  );
}

export { Checkbox };