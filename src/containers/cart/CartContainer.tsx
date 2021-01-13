import React, { useCallback, useEffect, useState } from 'react';
import Cart from '../../components/cart/Cart';
import { cartLists, deliveryTypes } from '../../data';

const CartContainer = () => {
  const [address, setAddress] = useState('서울시 강남구 도산대로 174 7층');
  const [deliveryOption, setDeliveryOption] = useState(0);
  const [cartList, setCartList] = useState(
    cartLists.map((cartItem) => ({ active: false, ...cartItem })),
  );
  const [totalProductsPrice, setTotalProductsPrice] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const setDropdownValue = useCallback((value: number) => {
    setDeliveryOption(value);
  }, []);

  const setItemCount = useCallback(
    (id: number, count: number) => {
      const nextCartList = cartList.map((item) =>
        item.id === id ? { ...item, current_count: count } : item,
      );
      setCartList(nextCartList);
    },
    [cartList],
  );

  const deleteItem = (id: number) => {
    const nextCartList = cartList.filter((item) => item.id !== id);
    setCartList(nextCartList);
  };

  const orderCartList = () => {
    if (!deliveryOption) {
      alert('배송 방법을 선택해주세요.');
      return;
    }

    const activeCartList = cartList.filter((cartItem) => cartItem.active);

    if (!activeCartList.length) {
      alert('상품을 선택해주세요.');
      return;
    }
    console.log('상품 리스트');
    activeCartList.forEach((item) => {
      console.log(
        `상품명: ${item.product_name}\n가격: ${item.product_price}\n개수: ${item.current_count}`,
      );
    });
    console.log(`총 상품 가격: ${totalProductsPrice}`);
    console.log(`배송비: ${totalDeliveryPrice}`);
  };

  const toggleCartItemActive = (id: number) => {
    const nextCartList = cartList.map((cartItem) =>
      cartItem.id === id ? { ...cartItem, active: !cartItem.active } : cartItem,
    );

    setCartList(nextCartList);
  };

  const toggleAllCartItemActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const nextCartList = cartList.map((cartItem) => ({
      ...cartItem,
      active: checked,
    }));

    setCartList(nextCartList);
  };

  // 각 금액 및 수량 설정
  useEffect(() => {
    const nextPriceAndCount = cartList.reduce(
      (priceAndCount, cartItem) =>
        cartItem.active
          ? {
              totalProductsPrice:
                priceAndCount.totalProductsPrice +
                cartItem.current_count * cartItem.product_price,
              totalProductsCount:
                priceAndCount.totalProductsCount + cartItem.current_count,
            }
          : priceAndCount,
      {
        totalProductsPrice: 0,
        totalProductsCount: 0,
      },
    );

    setTotalProductsPrice(nextPriceAndCount.totalProductsPrice);
    setTotalProductsCount(nextPriceAndCount.totalProductsCount);
    setTotalPrice(nextPriceAndCount.totalProductsPrice + totalDeliveryPrice);
  }, [cartList, totalDeliveryPrice]);

  // 배송 금액 설정
  useEffect(() => {
    if (deliveryOption) {
      const deliveryPrice = deliveryTypes.find(
        (type) => deliveryOption === type.id,
      )?.delivery_price;

      if (deliveryPrice !== undefined) {
        setTotalDeliveryPrice(deliveryPrice);
      }
    }
  }, [deliveryOption, setTotalDeliveryPrice]);

  return (
    <Cart
      address={address}
      dropdownItems={deliveryTypes}
      cartList={cartList}
      setDropdownValue={setDropdownValue}
      toggleCartItemActive={toggleCartItemActive}
      toggleAllCartItemActive={toggleAllCartItemActive}
      setItemCount={setItemCount}
      deleteItem={deleteItem}
      totalProductsPrice={totalProductsPrice}
      totalProductsCount={totalProductsCount}
      totalDeliveryPrice={totalDeliveryPrice}
      totalPrice={totalPrice}
      orderCartList={orderCartList}
    />
  );
};

export default CartContainer;
