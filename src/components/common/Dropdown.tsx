import React, { useEffect } from 'react';
import styled from 'styled-components';
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

const DropdownSelect = styled.select`
  padding: 6px;
  font-size: 1rem;
`;

const Dropdown = ({ dropdownItems, setDropdownValue }: DropdownProps) => {
  const { option, changeOption } = useOption();

  useEffect(() => {
    if (option) {
      setDropdownValue(option);
    }
  }, [option, setDropdownValue]);

  return (
    <DropdownSelect onChange={changeOption} defaultValue={0}>
      <option value={0} hidden disabled>
        선택해주세요.
      </option>
      {dropdownItems.map((item) => (
        <option value={item.id}>
          {item.name} ({item.delivery_price.toLocaleString('ko-KR')}원)
        </option>
      ))}
    </DropdownSelect>
  );
};

export default Dropdown;
