import React, { useEffect } from 'react';
import useCount from '../../hooks/useCount';

interface CounterProps {
  id: number;
  currentCount: number;
  stock: number;
  setItemCount: (id: number, count: number) => void;
}

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
      <button type="button" onClick={onDecreaseCount}>
        -
      </button>
      <span>{count}</span>
      <button type="button" onClick={onIncreaseCount}>
        +
      </button>
    </div>
  );
};

export default Counter;
