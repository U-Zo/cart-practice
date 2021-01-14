import React from 'react';
import styled from 'styled-components';
import Counter from '../common/Counter';
import Dropdown, { DropdownProps } from '../common/Dropdown';

interface CartItemType {
  id: number;
  image_url: string;
  product_name: string;
  product_price: number;
  current_count: number;
  stock: number;
  active: boolean;
}

interface CartItemProps extends CartItemType {
  toggleCartItemActive: (id: number) => void;
  setItemCount: (id: number, count: number) => void;
  deleteItem: (id: number) => void;
}

const CartItemBlock = styled.div`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-top: 1px solid #ffb5b5;

  & > img {
    width: 100px;
  }

  &:last-child {
    border-bottom: 1px solid #ffb5b5;
  }
`;

const CartItemName = styled.div`
  width: 20%;
  text-align: center;
  font-weight: bold;
`;

const CartItemPrice = styled.div`
  width: 20%;
  text-align: center;
`;

const CartItemCloseButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
`;

const CartItem = ({
  id,
  image_url,
  product_name,
  product_price,
  current_count,
  stock,
  active,
  toggleCartItemActive,
  setItemCount,
  deleteItem,
}: CartItemProps) => {
  return (
    <CartItemBlock>
      <input
        type="checkbox"
        onChange={() => toggleCartItemActive(id)}
        checked={active}
      />
      <img src={image_url} alt="" />
      <CartItemName>{product_name}</CartItemName>
      <CartItemPrice>{product_price.toLocaleString('ko-KR')}</CartItemPrice>
      <Counter
        id={id}
        currentCount={current_count}
        setItemCount={setItemCount}
        stock={stock}
      />
      <CartItemCloseButton type="button" onClick={() => deleteItem(id)}>
        X
      </CartItemCloseButton>
    </CartItemBlock>
  );
};

interface CartProps extends DropdownProps {
  address: string;
  cartList: CartItemType[];
  totalProductsPrice: number;
  totalProductsCount: number;
  totalDeliveryPrice: number;
  totalPrice: number;
  toggleCartItemActive: (id: number) => void;
  toggleAllCartItemActive: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setItemCount: (id: number, count: number) => void;
  deleteItem: (id: number) => void;
  orderCartList: () => void;
}

const CartBlock = styled.div`
  width: 1200px;
  margin: 100px auto;

  h1,
  h3 {
    padding-bottom: 0.5rem;
  }
`;

const CartTitleBlock = styled.div`
  border-bottom: 2px solid #f46767;
`;

const AddressBlock = styled.div`
  padding: 1rem 0;
`;

const DeliveryBlock = styled.div`
  padding: 1rem 0;
`;

const CartListBlock = styled.div`
  padding: 1rem 0;
`;

const CartListHead = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  & > span {
    padding-right: 0.5rem;
  }
`;

const CartListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #ddd;
  padding: 1rem;

  & > span {
    width: 25%;
    text-align: center;
  }
`;

const CartListSubmitBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;

  & > button {
    padding: 1rem;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background-color: #f46767;
  }
`;

const Cart = ({
  address,
  dropdownItems,
  setDropdownValue,
  cartList,
  toggleCartItemActive,
  toggleAllCartItemActive,
  setItemCount,
  deleteItem,
  totalProductsPrice,
  totalProductsCount,
  totalDeliveryPrice,
  totalPrice,
  orderCartList,
}: CartProps) => {
  return (
    <CartBlock>
      <CartTitleBlock>
        <h1>장바구니</h1>
      </CartTitleBlock>
      <AddressBlock>
        <h3>주소</h3>
        <p>{address}</p>
      </AddressBlock>
      <DeliveryBlock>
        <h3>배송 방법</h3>
        <Dropdown
          dropdownItems={dropdownItems}
          setDropdownValue={setDropdownValue}
        />
      </DeliveryBlock>
      <CartListBlock>
        <h3>상품 내역</h3>
        <div>
          <CartListHead>
            <span>전체</span>
            <input type="checkbox" onChange={toggleAllCartItemActive} />
          </CartListHead>
          <div>
            {cartList.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                current_count={item.current_count}
                image_url={item.image_url}
                product_name={item.product_name}
                product_price={item.product_price}
                stock={item.stock}
                active={item.active}
                toggleCartItemActive={toggleCartItemActive}
                setItemCount={setItemCount}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        </div>
      </CartListBlock>
      <CartListBottom>
        <span>
          총 상품 금액: {totalProductsPrice.toLocaleString('ko-KR')}원
        </span>
        <span>총 상품 수량: {totalProductsCount}개</span>
        <span>총 배송비: {totalDeliveryPrice.toLocaleString('ko-KR')}원</span>
        <span>총 결제하실 금액: {totalPrice.toLocaleString('ko-KR')}원</span>
      </CartListBottom>
      <CartListSubmitBlock>
        <button type="button" onClick={orderCartList}>
          주문하기
        </button>
      </CartListSubmitBlock>
    </CartBlock>
  );
};

export default Cart;
