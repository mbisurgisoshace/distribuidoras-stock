import { useFormContext } from "react-hook-form";

import "./styles.css";
interface CargaInputProps {
  name: string;
  index: number;
  label: string;
  value: number;
}
export default function CargaInput({
  name,
  label,
  value,
  index,
}: CargaInputProps) {
  const { register } = useFormContext();
  return (
    <div className={"CargaInput"}>
      <label htmlFor={name}>{label.toUpperCase()}</label>
      <input type={"number"} {...register(`items.${index}.${name}`)} />
    </div>
  );
}
