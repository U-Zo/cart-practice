import React, { useEffect } from 'react';
import useOption from '../../hooks/useOption';

interface DropdownItemType {
  id: number;
  name: string;
  delivery_price: number;
}

export interface DropdownProps {
  dropdownItems: DropdownItemType[];
  setDropdownValue: (value: number) => void;
}

const Dropdown = ({ dropdownItems, setDropdownValue }: DropdownProps) => {
  const { option, changeOption } = useOption();

  useEffect(() => {
    if (option) {
      setDropdownValue(option);
    }
  }, [option, setDropdownValue]);

  return (
    <select onChange={changeOption} defaultValue={0}>
      <option value={0} disabled>
        선택해주세요.
      </option>
      {dropdownItems.map((item) => (
        <option value={item.id}>
          {item.name} ({item.delivery_price.toLocaleString('ko-KR')}원)
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
