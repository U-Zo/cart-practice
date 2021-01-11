import React, { useEffect } from 'react';
import useCount from '../../hooks/useCount';

interface CounterProps {
  id: number;
  current_count: number;
  stock: number;
  setItemCount: (id: number, count: number) => void;
}

const Counter = ({ id, current_count, stock, setItemCount }: CounterProps) => {
  const { count, increaseCount, decreaseCount } = useCount(current_count);

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
    setItemCount(id, count);
  }, [count, id, setItemCount]);

  return (
    <div>
      <button type="button" onClick={onIncreaseCount}>
        -
      </button>
      <span>{count}</span>
      <button type="button" onClick={onDecreaseCount}>
        +
      </button>
    </div>
  );
};

export default Counter;
