import type { InputHTMLAttributes } from 'react'
import { isValidNumber, limits, type NumericField } from '../simulation/validation'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  field: NumericField
  value: number
  onChange: (value: number) => void
}

export function NumberInput({ field, value, onChange, ...props }: Props) {
  return <input {...props} type="number" min={limits[field][0]} max={limits[field][1]} step={1}
    value={Number.isNaN(value) ? '' : value}
    aria-invalid={!isValidNumber(value, field)}
    onChange={event => onChange(event.target.value === '' ? NaN : Number(event.target.value))} />
}
