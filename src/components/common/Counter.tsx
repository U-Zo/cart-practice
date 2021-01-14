import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCount from '../../hooks/useCount';

interface CounterProps {
  id: number;
  currentCount: number;
  stock: number;
  setItemCount: (id: number, count: number) => void;
}

const CounterButton = styled.button`
  border: none;
  background-color: inherit;
  padding: 2rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Counter = ({ id, currentCount, stock, setItemCount }: CounterProps) => {
  const { count, increaseCount, decreaseCount } = useCount(currentCount);

  const onIncreaseCount = () => {
    if (count < stock) {
      increaseCount();
    }
  };

  const onDecreaseCount = () => {
    if (count > 1) {
      decreaseCount();
    }
  };

  useEffect(() => {
    if (count !== currentCount) {
      setItemCount(id, count);
    }
  }, [count, currentCount, id, setItemCount]);

  return (
    <div>
      <CounterButton type="button" onClick={onDecreaseCount}>
        -
      </CounterButton>
      <span>{count}</span>
      <CounterButton type="button" onClick={onIncreaseCount}>
        +
      </CounterButton>
    </div>
  );
};

export default Counter;
