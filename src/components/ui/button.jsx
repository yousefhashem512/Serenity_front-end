const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  gradientFrom = '#AA8453',
  gradientTo = '#C5A059',
  ...props
}) => {
  const baseStyles = 'font-bold rounded transition-all duration-300 uppercase tracking-wider inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: `bg-gradient-to-r text-white shadow-md hover:shadow-lg`,
    secondary: 'bg-transparent border-2 border-spa-gold text-spa-gold hover:bg-spa-gold hover:text-white',
    outlined: 'bg-white border-2 border-spa-brown-dark text-spa-brown-dark hover:bg-spa-brown-dark hover:text-white',
    text: 'bg-transparent text-spa-gold ',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base',
    lg: 'px-8 md:px-10 py-3 md:py-4 text-base md:text-lg',
  };

  const gradientStyle = variant === 'primary' ? {
    backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
  } : {};

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
      style={gradientStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
