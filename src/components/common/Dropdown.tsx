import React, { useEffect } from 'react';
import useOption from '../../hooks/useOption';

interface DropdownItem {
  name: string;
  value: number;
}

interface DropdownProps {
  items: DropdownItem[];
  setValue: (value: number) => void;
}

const Dropdown = ({ items, setValue }: DropdownProps) => {
  const { option, changeOption } = useOption();

  useEffect(() => {
    setValue(option);
  }, [option, setValue]);

  return (
    <select onChange={changeOption}>
      {items.map((item) => (
        <option value={item.value}>{item.name}</option>
      ))}
    </select>
  );
};

export default Dropdown;
