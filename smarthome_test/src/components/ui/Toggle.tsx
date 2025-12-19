interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Toggle({ enabled, onChange, disabled = false, size = 'md' }: ToggleProps) {
  const sizeStyles = {
    sm: { container: 'w-10 h-5', circle: 'w-4 h-4', translate: 'translate-x-5' },
    md: { container: 'w-12 h-6', circle: 'w-5 h-5', translate: 'translate-x-6' },
    lg: { container: 'w-14 h-7', circle: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const styles = sizeStyles[size];

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`${styles.container} relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`${styles.circle} inline-block transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? styles.translate : 'translate-x-1'
        }`}
      />
    </button>
  );
}
