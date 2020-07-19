import { CartType, User } from '../types'
import React, { ReactElement, useEffect, useState } from 'react';

// import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import checkIcon from '../assets/images/checkIcon.png';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  .stage-item {
    padding: 20px;
    border-radius: 3px;
    background-color: #efefef;
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    font-size: 24px;
    color: #333333;
    width: 260px;

    .selected-index {
      width: 70px;
    }

    .unselected-index {
      width: 70px;
      color: #999999;
    }

    .selected-title {
      font-weight: bold;
    }

    .unselected-title {
      font-weight: bold;
      color: #999999;
    }
  }
`;

const Table = styled.div`
  width: 100%;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  margin: 20px 0px;
  text-align: center;

  thead {
    td {
      font-size: 16px;
      color: #999999;
      padding: 10px;
    }
  }

  tbody {
    td {
      font-size: 18px;
      color: #333333;
      padding: 10px;

      /* img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      } */
    }
  }
`;

const Checkbox = styled.button`
  outline: none;
  width: 20px;
  height: 20px;
  border: solid 1px #707070;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00a457;
  border-radius: 3px;

  img {
    width: 13.9px;
    height: 11.7px;
  }

  &:focus {
    outline: none ;
  }
`;

const RemoveButton = styled.button`
  width: 50px;
  height: 50px;
  outline: none;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #999999;
  border-radius: 30px;
`;

const NumberOfCartItems = styled.div`
  font-size: 24px;
  color: #333333;
  font-weight: 900;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 0px;
`;

const PurchaseButton = styled.button`
  outline: none;
  background: none;
  border: none;
  width: 300px;
  height: 66px;
  border-radius: 10px;
  background-color: #333333;
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 900;
`;

const PriceWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  height: 100%;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  
  .divide-wrapper {
    padding: 30px 20px;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff8ed;
    border-right: 1px solid #efefef;

    .title {
      font-size: 18px;
      color: #333333;
    }

    .content {
      font-size: 30px;
      color: #333333;
    }
  }
`;

const InputGroup = styled.div`
  width: 100%;
  padding: 10px;
  
  .title {
    font-size: 24px;
    color: #333333;
    padding: 10px 0px;
  }

  .input-wrapper {
    width: 100%;
    background-color: #f8f8f8;
    border-top: solid 1px #707070;
    border-bottom: solid 1px #707070;

    .row {
      display: flex;
      flex-direction: row;
      padding: 20px;

      .item-title {
        font-size: 18px;
        color: #333333;
        width: 150px;
      }

      .item-content {
        flex: 1;

        input {
          height: 20px;
          border-radius: 3px;
          border: solid 0.5px #707070;
        }
      }

      .item-price {
        font-size: 18px;
        font-weight: bold;
      }

      .item-purchace-option {
        display: flex;
        flex-direction: row;
      }
    }
  }
`;

const PayItem = styled.button`
  outline: none;
  background: none;
  border: none;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  color: #333333;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  
  .radio-icon {
    padding: 2px;
    width: 20px;
    height: 20px;
    border: solid 1px #999999;
    border-radius: 30px;
    margin-right: 10px;
  
    .selected {
      background-color: #00a457;
      width: 100%;
      height: 100%;
      border-radius: 30px;
    }
  }
`;

function Page() {
  const stageItems: string[] = ['장바구니', '주문작성/결제', '주문완료'];

  const [loadingCartItems, setLoadingCartItems] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartType[]>();

  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);

  const [purchaseItems, setPurchaseItems] = useState<string[]>();

  const fetchCartItems = (): void => {
    try {
      axios.get(`http://localhost:5000/api/order/cartList/5f1275514cd7b64530a81298`)
      .then(res => {
        const { status, data } = res;

        if(status === 200) {

          const cartItems: CartType[] = [];
          data.forEach((item: { cart: { productId: any; orderNum: any; orderPrice: any; _id: any }; productName: any; productPrice: any; productImage: any }) => {
            cartItems.push({
              cartId: item.cart._id,
              productImage: item.productImage,
              productId: item.cart.productId,
              productName: item.productName,
              productPrice: item.productPrice,
              orderNum: item.cart.orderNum,
              orderPrice: item.cart.orderPrice,
            });
          });
          setCartItems(cartItems);
          setLoadingCartItems(false);
        }
      })
      .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const removeCartItem = (cartId: string): void => {
    axios.delete(`http://localhost:5000/api/order/${cartId}`)
    .then(res => {
      const { status } = res;

      console.log(res);

      if(status === 201) {
        alert('아이템을 삭제했습니다 :)');
        setCartItems(prev => prev?.filter((item, i) => item.cartId !== cartId));
      }
    })
    .catch(error => console.log(error))
  }

  const getStageElement = (item: number): ReactElement => {
    if(stage === item) {
      return (
        <div key={`item__${item}`} className="stage-item">
          <div className="selected-index">0{item+1}</div>
          <div className="selected-title">{stageItems[item]}</div>
        </div>
      );
    }

    return (
      <div key={`item__${item}`} className="stage-item">
        <div className="unselected-index">0{item+1}</div>
        <div className="unselected-title">{stageItems[item]}</div>
      </div>
    );
  }

  const getCartElement = (item: CartType, index: number): ReactElement => (
    <tr key={`item__${index}`}>
      <td>{checkBox((purchaseItems?.includes(item.cartId) || false), (): void => {
        if(purchaseItems?.includes(item.cartId)) {
          setPurchaseItems(prev => prev?.filter(i => item.cartId !== i));
          return;
        }
        setPurchaseItems(prev => prev?.concat(item.cartId))
      })}</td>
      <td><img src={item.productImage} alt="" style={{ width: 100, height: 100 }} /></td>
      <td>{item.productName}</td>
      <td>{item.orderNum}</td>
      <td>{item.orderPrice}</td>
      <td>{parseInt(item.orderNum) * parseInt(item.orderPrice)}</td>
      <td>0원</td>
      <td style={{ textAlign: 'center'}}>
        <RemoveButton onClick={(): void => removeCartItem(item.cartId)}>삭제</RemoveButton>
      </td>
    </tr>
  )

  const checkBox = (checked: boolean, checkFunc: () => void): ReactElement => {
    if(checked) {
      return (
        <Checkbox style={{ border: 'none' }} onClick={(): void => checkFunc()}>
          <img src={checkIcon} alt="" />
        </Checkbox>
      );
    }

    return (
      <Checkbox style={{ background: 'none'}}  onClick={(): void => checkFunc()}>
      </Checkbox>
    );
  }

  const [userName, setUserName] = useState<string>();
  const [phoneNum, setPhoneNum] = useState<string>();
  const [telephoneNum, setTelephoneNum] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [payType, setPayType] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if(purchaseItems) {
      let price: number = 0;
      purchaseItems.forEach(cartID => {
        const ind: number = cartItems?.findIndex(t => t.cartId === cartID) || -1;

        if(ind !== -1 && cartItems) {
          price += parseInt(cartItems[ind].orderPrice);
        }
      });
      setTotalPrice(price);
    }
  }, [purchaseItems]);

  const payTypeItems: string[] = ['신용카드', '실시간 계좌이체', '가상계좌'];
  
  const purchaseOptionElement = (itemIndex: number): ReactElement => {
    if(itemIndex === payType) {
      return (
        <PayItem>
          <div className="radio-icon">
            <div className="selected" />
          </div>
          {payTypeItems[itemIndex]}
        </PayItem>
      );
    }

    return (
      <PayItem onClick={(): void => setPayType(itemIndex)}>
        <div className="radio-icon" />
        {payTypeItems[itemIndex]}
      </PayItem>
    );
  }

  const getUserId = (): string => {
    const stringUser = window.localStorage.getItem("user");

    if(stringUser) {
      const tmp = JSON.parse(stringUser);
      return tmp._id;
    }

    return '';
  }

  const requestBuy = (): void => {

    const cartList = cartItems?.map((c, i) => ({
      _id: c.cartId,
      productId: c.productId,
      productName: c.productName,
      productPrice: c.productPrice,
      orderNum: c.orderNum,
      orderPrice: c.orderPrice
    }));

    if(cartList) {
      axios.post(`http://localhost:5000/api/order`, {
        userId: getUserId(),
        totalPrice: totalPrice.toString(),
        payType: payTypeItems[payType],
        buyerInfo: {
          name: userName,
          phoneNum,
          telephoneNum,
          "zipcode": "123-456",
          address,
        },
        receiverInfo: {
          name: userName,
          phoneNum,
          telephoneNum,
          "zipcode": "123-456",
          address,
        },
        cartList,
      })
      .then(res => {
        if (res.status === 201) {
          setStage(2);
        }
      })
      .catch(error => console.log(error));

      return;
    } 
    
    alert('주문할 아이템이 없어요 :(');
  }

  return (
    <Container>
      <Row>
        {
          stageItems.map((item, index) => getStageElement(index))
        }
      </Row>
      {
        loadingCartItems 
        ? 
        <LoadingWrapper>
          로딩중입니다~!
        </LoadingWrapper>
        :  
        stage === 2 
        ? <LoadingWrapper> 주문이 완료되었습니다 :)</LoadingWrapper>
        : 
        <>
          <Table>
            <thead>
              <tr style={{ width: '100%' }}>
                <td>
                {checkBox(cartItems?.length === purchaseItems?.length, (): void => {
                  if(cartItems?.length === purchaseItems?.length) {
                    setPurchaseItems([]);
                    return;
                  }

                  setPurchaseItems(prev => cartItems?.map((item, index) => item.cartId))
                })}
                </td>
                <td></td>
                <td style={{ width: 500 }}>상품명</td>
                <td style={{ width: '10%' }}>수량</td>
                <td style={{ width: '10%'  }}>상품가</td>
                <td style={{ width: '10%'  }}>주문금액</td>
                <td style={{ width: '10%'  }}>배송비</td>
                <td style={{ width: '10%'  }}></td>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => getCartElement(item, index))}
            </tbody>
          </Table>
          <NumberOfCartItems>총 {cartItems?.length}개의 상품</NumberOfCartItems>
          <PriceWrapper>
            <div className="divide-wrapper">
              <div className="title">주문금액</div>
              <div className="content">{totalPrice}원</div>
            </div>
            <div className="divide-wrapper">
              <div className="title">할인금액</div>
              <div className="content">0원</div>
            </div>
            <div className="divide-wrapper" style={{ borderRightWidth: 0 }}>
              <div className="title">결제예정금액</div>
              <div className="content" style={{ fontWeight: 'bold' }}>{totalPrice}원</div>
            </div>
          </PriceWrapper>
        </>
      }
      {
        stage === 1 
        ? 
        <div style={{ width: '100%' }}>
          <InputGroup>
            <div className="title">주문하시는분</div>
            <div className="input-wrapper">
              <div className="row">
                <div className="item-title">이름</div>
                <div className="item-content"><input type="text" value={userName} onChange={e => setUserName(e.target.value)} /></div>
              </div>
              <div className="row">
                <div className="item-title">전화번호</div>
                <div className="item-content"><input type="text" value={phoneNum} onChange={e => setPhoneNum(e.target.value)} /></div>
              </div>
              <div className="row">
                <div className="item-title">휴대폰번호</div>
                <div className="item-content"><input type="text" value={telephoneNum} onChange={e => setTelephoneNum(e.target.value)} /></div>
              </div>
              <div className="row">
                <div className="item-title">주소</div>
                <div className="item-content"><input type="text" style={{ width: 300}} value={address} onChange={e => setAddress(e.target.value)}/></div>
              </div>
            </div>
          </InputGroup>
          <InputGroup>
            <div className="title">결제선택</div>
            <div className="input-wrapper">
              <div className="row">
                <div className="item-title">총 결제금액</div>
                <div className="item-price">{totalPrice}원</div>
              </div>
              <div className="row">
                <div className="item-title">결제방법</div>
                <div className="item-purchace-option">
                  {payTypeItems.map((item, index) => purchaseOptionElement(index))}
                </div>
              </div>
            </div>
          </InputGroup>
          <ButtonWrapper>
            <PurchaseButton onClick={(): void => requestBuy()}>결제하기</PurchaseButton>
          </ButtonWrapper>
        </div>
        :
        stage !== 2
        ? 
         <ButtonWrapper>
          <PurchaseButton onClick={(): void => setStage(1)}>주문하기</PurchaseButton>
        </ButtonWrapper>
        : null
      }     
    </Container>
  );
}

export default Page;