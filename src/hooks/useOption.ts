import { useState } from 'react';

const useOption = () => {
  const [option, setOption] = useState<number>(0);

  const changeOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOption(parseInt(e.target.value, 10));
  };

  return { option, changeOption };
};

export default useOption;
