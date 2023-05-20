export default function Input({
  type,
  id,
  name,
  value,
  label,
  onChange,
  placeholder,
  required,
  disabled,
  className,
  error,
  ...props
}) {
  return (
    <div className={`input ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
