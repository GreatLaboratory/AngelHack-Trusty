import React, { ReactElement, useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios';
import queryString from 'query-string';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 800px;
  border-radius: 10px;

  .main-image {
    flex: 1;
    
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Content = styled.div`
  padding: 20px;
  .title {
    font-size: 45px;
    color: #333333;
  }

  .price {
    font-size: 40px;
    font-weight: 900;
  }

  .seller {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;

    img {
      width: 80px;
      height: 80px;
      border-radius: 60px;
    }
  }

  .row {
    margin: 10px 0px;
    font-size: 16px;
    color: #666666;
  }
`;

type ProductType = {
  category: string;
  description: string;
  mainImage: string;
  title: string;
  price: string;
  productArea: string;
  sellerName: string;
  sellerImage: string;
  stock: string;
}

function Detail(props: RouteComponentProps) {
  const [product, setProduct] = useState<ProductType>();

  const fetchProduct = (): void => {
    const query = queryString.parse(props.location.search);
    console.log(query.id);

    axios.get(`http://localhost:5000/api/product/detail/${query.id}`)
    .then(res => {
      const { status, data } = res;

      if(status === 200) {
        console.log(data);
        setProduct({
          category: data.category,
          description: data.description,
          mainImage: data.mainImage,
          title: data.name,
          price: data.price,
          productArea: data.productArea,
          sellerName: data.sellerId.name,
          sellerImage: data.sellerId.profileImage,
          stock: data.stock,
        });
      }
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
  <Container>
    <RowWrapper>
      <div className="main-image">
        <img src={product?.mainImage} alt="" />
      </div>
      <div className="main-image">
        <Content>
          <div className="title">{product?.title}</div>
          <div className="price">{product?.price}원/K</div>
          <div className="seller">
            <div>{product?.productArea}</div>
            <img src={product?.sellerImage} alt="" />
          </div>
          <div className="row">원산지: 국산 ({product?.productArea})</div>
          <div className="row">무료배송 ({product?.productArea})</div>
          <div>
            <img src="https://user-images.githubusercontent.com/31176502/87875235-d62d5400-ca0a-11ea-9a35-858f4b02a094.png" alt="" />
          </div>
        </Content>
      </div>
    </RowWrapper>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img style={{ width: 850 }} src="https://user-images.githubusercontent.com/31176502/87875256-0aa11000-ca0b-11ea-914d-10fe449811d6.png" alt="" />
      <img style={{ width: 850 }} src="https://user-images.githubusercontent.com/31176502/87875276-2f958300-ca0b-11ea-808b-3b84ae38416e.png" alt="" />
    </div>
    
  </Container>
  );
}

export default Detail;