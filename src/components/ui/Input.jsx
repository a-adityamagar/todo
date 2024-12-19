function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}

export { Input };