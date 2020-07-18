import React, { CSSProperties, ReactElement } from 'react';

import { Link } from 'react-router-dom';
import { ProductItemType } from '../types'
import styled from 'styled-components';

const Container = styled.div`
  width: 18%;
  padding: 0px 10px;
`;

const Wrapper = styled.div`
  border-radius: 10px;
  border: solid 0.5px #999999;
  overflow: hidden;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 60%;
  
  img {
    width: 100%;
    height: 60%;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: 900;
  color: #333333;
  padding-right: 10px;
`;

const Title = styled.div`
  /* display: flex;
  flex-direction: row; */
  /* justify-content: flex-end; */
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
  flex-wrap: wrap;
  padding: 0 10px;
  text-align: right;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;

  .left {
    img {
      width: 45px;
      height: 45px;
      border-radius: 30px;
      margin-bottom: 10px;
    }

    .seller {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      color: #333333;
      
      .name {
        width: 45px;
        height: 18px;
        border-radius: 4px;
        background-color: #00a457;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        margin-left: 5px;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    button {
      text-align: center;
      width: 50px;
      height: 50px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      border: none;
      background: none;
      border: solid 0.5px #999999;
      border-radius: 30px;
      font-size: 10px;
      font-weight: bold;
      color: #333333;
    }
  }
`;



interface Props {
  item: ProductItemType;
  containerStyle?: CSSProperties;
  clickCart?: () => void;
}

function Shared(props: Props) {
  const { item, containerStyle, clickCart } = props;

  const getTitle = (str: string): string => {
    if(str.length >= 12) {
      return str.slice(0, 12) + '...';
    }

    return str;
  }
  
  return (
    <Container style={containerStyle} key={`item__${item.prouductId}`}>
      <Link to={`/main/product/detail?id=${item.prouductId}`} style={{ width: '100%', height: '100%', textDecoration: 'none' }}>
      <Wrapper>
        <ProductImage>
          <img  src={item.productImage} alt="" />
        </ProductImage>
        <Price>{item.price}원/k</Price>
        <Title>{getTitle(item.productTitle)}</Title>
        <Row>
          <div className="left">
            <img src={item.sellerProfileImage} alt="" />
            <div className="seller">
              {item.location}
              <div className="name">{item.sellerName}</div>
            </div>
          </div>
          <div className="right">
            <button onClick={clickCart}>장바구니</button>
          </div>
        </Row>
      </Wrapper>
      </Link>
    </Container>
  );
}

export default Shared;