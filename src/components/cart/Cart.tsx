import React from 'react';
import Dropdown, { DropdownProps } from '../common/Dropdown';
import Counter from '../common/Counter';

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
    <div>
      <input
        type="checkbox"
        onChange={() => toggleCartItemActive(id)}
        checked={active}
      />
      <img src={image_url} alt="" />
      <div>{product_name}</div>
      <div>{product_price}</div>
      <Counter
        id={id}
        currentCount={current_count}
        setItemCount={setItemCount}
        stock={stock}
      />
      <button type="button" onClick={() => deleteItem(id)}>
        X
      </button>
    </div>
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
    <div>
      <h1>장바구니</h1>
      <div>
        <h3>주소</h3>
        <p>{address}</p>
      </div>
      <div>
        <h2>배송 방법</h2>
        <Dropdown
          dropdownItems={dropdownItems}
          setDropdownValue={setDropdownValue}
        />
      </div>
      <div>
        <h2>상품 내역</h2>
        <div>
          <div>
            <input type="checkbox" onChange={toggleAllCartItemActive} />
          </div>
          <div>
            {cartList.map((item) => (
              <CartItem
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
      </div>
      <div>
        <span>
          총 상품 금액: {totalProductsPrice.toLocaleString('ko-KR')}원
        </span>
        <span>총 상품 수량: {totalProductsCount}개</span>
        <span>총 배송비: {totalDeliveryPrice.toLocaleString('ko-KR')}원</span>
        <span>총 결제하실 금액: {totalPrice.toLocaleString('ko-KR')}원</span>
      </div>
      <div>
        <button type="button" onClick={orderCartList}>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default Cart;
