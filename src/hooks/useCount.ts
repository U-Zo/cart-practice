import { useState } from 'react';

const useCount = (currentCount: number) => {
  const [count, setCount] = useState<number>(currentCount);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return { count, increaseCount, decreaseCount };
};

export default useCount;
