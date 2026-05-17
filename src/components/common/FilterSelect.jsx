import { ChevronDown } from 'lucide-react';

/**
 * Dropdown lọc trên header tối — nền sáng, chữ đậm, dễ đọc khi mở danh sách.
 */
const FilterSelect = ({
  value,
  onChange,
  options,
  className = '',
  title,
  'aria-label': ariaLabel,
}) => (
  <div className={`relative min-w-0 ${className}`}>
    <select
      value={value}
      onChange={onChange}
      title={title}
      aria-label={ariaLabel || title}
      className="select-filter w-full"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-accent-violet"
      aria-hidden
    />
  </div>
);

export default FilterSelect;
