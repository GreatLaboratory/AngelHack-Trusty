import { CategoryType, ProductItemType, SortType, User, categoryItem } from '../types'
import React, { ReactElement, useEffect, useState } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { ProductItem } from '../components'
import axios from 'axios';
import queryString from 'query-string';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import { useUserState } from '../contexts/UserContext';

const Container = styled.div`
  width: 100%;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const SortItem = styled.button`
  width: 100px;
  outline: none;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;

  .selected {
    background-color: #00a457;
    border-radius: 24px;
    width: 100%;
    height: 100%;
    padding: 5px 0;
  }

  .unselected {
    background-color: #cccccc;
    border-radius: 24px;
    width: 100%;
    height: 100%;
    padding: 5px 0;
  }
`;

const Category = styled.div`
  margin: 10px;
  flex: 1;
  border-radius: 10px;
  background-color: #f8f8f8;
  padding: 10px;

  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      width: 80px;
      text-align: left;
    }

    .items {
      flex :1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;

const CategoryItem = styled.button`
  outline: none;
  border: none;
  background: none;
  margin: 0 5px;

  .selected {
    font-size: 16px;
    font-weight: bold;
    color: #00a457;
  }

  .unselected {
    font-size: 16px;
    font-weight: 500;
    color: #999999;
  }
`;

function Page(props: RouteComponentProps) {
  const { location: { pathname } } = useReactRouter();

  const [user, setUser] = useState<User>();

  const getUser = (): void => {
    const stringUser = window.localStorage.getItem("user");

    if(stringUser) {
      const tmp = JSON.parse(stringUser);
      console.log(tmp);
      setUser({
        _id: tmp._id,
        userType: tmp.userType,
        userId: tmp.id,
        profileImage: tmp.profileImage,
        userName: tmp.userName,
        phoneNum: tmp.phoneNum,
        storeName: tmp.storeName,
        address: tmp.address,
        orderIdList: tmp.orderIdList,
        cartIdList: tmp.cartIdList,
        reviewIdList: tmp.reviewIdList,
      });
    }
  }

  const [productItems, setProductItems] = useState<ProductItemType[]>();

  const fetchProductItem = (): void => {
    axios.get('http://localhost:5000/api/product/list')
    .then(res => {
      const { status, data } = res;

      if (status === 200) {
        const tmpProductItems: ProductItemType[] = [];
        data.forEach((item: any, index: number) => {
          tmpProductItems.push({
            prouductId: item._id,
            productImage: item.mainImage,
            price: item.price,
            productTitle: item.name,
            sellerProfileImage: item.sellerId.profileImage,
            location: item.productArea,
            sellerName: item.sellerId.name,
          });
        })
        setProductItems(tmpProductItems);
      }
    })
    .catch(error => console.log(error));
  }

  const query = queryString.parse(props.location.search);

  useEffect(() => {
    getUser();
    
    if(query.sort) {
      if(query.category) {

      }else {

      }
      return;
    }
    if(query.category) {

      return;
    }
    fetchProductItem();
  }, []);

  const requestPostCart = (item: ProductItemType): void => {
    try {
      if(user?._id) {
        axios.post(`http://localhost:5000/api/order/takeInCart/${user?._id}`, {
          productId: item.prouductId,
          orderNum: '1', // 장바구니에 담기니까 일단 1개
          orderPrice: item.price,
        })
        .then(res => {
          const { status, data } = res;

          if (status === 200) {
            console.log(data);
            const newUser = {
              ...user,
              orderIdList: [...user.orderIdList, data.productId]
            }

            window.localStorage.setItem('user', JSON.stringify(newUser));
          }
          alert('장바구니에 담았습니다 :)');
        })
        .catch(error => console.log(error));
      }
      
    }catch (error) {
      console.log(error);
    }
  }


  const productItemsRow = (items: ProductItemType[], i: number): ReactElement => {
    return (
      <RowWrapper key={`item__${i}`}>
        {items.map((item, index) => <ProductItem key={`item${index}`} item={item} clickCart={(): void => requestPostCart(item)} 
        />)}
      </RowWrapper>
    );
  }

  const productItemsElement = (): ReactElement[] => {
    let rtn: ReactElement[] = [];

    const length = productItems?.length || 0;

    for (let i=0; i<=length/5; i++) {
      let end = i*5 + 5;
      if(i === length/5) {
        end = length;
      }
      const tmpItems = productItems?.slice(i*5, end);

      if(tmpItems) {
        rtn = [...rtn,productItemsRow(tmpItems, i)];
      }
    }

    return rtn;
  }



  // Related to sort
  const [sort, setSort] = useState<SortType>(SortType.LOW_PRICE);
  
  const sortItems: string[] = ["최신순", "가격낮은순", "가격높은순", "거리순"];

  const requestItemsBySort = (sort: number): void => {
    if(query.category) {
      window.location.href = `/main/product?category=${query.category}&sort=${sort}`
    }else {
      window.location.href = `/main/product?sort=${sort}`
    }
  }

  const sortElement = (index: number): ReactElement => {
    if(index.toString() === query.sort) {
      return (
        <SortItem key={`item__${index}`}>
          <div className="selected">{sortItems[index]}</div>
        </SortItem>
      );
    }

    return (
      <SortItem key={`item__${index}`} onClick={(): void => requestItemsBySort(index)}>
        <div className="unselected">{sortItems[index]}</div>
      </SortItem>
    );
  }

  const category: CategoryType[] = [
    {
      title: '식량작물',
      items: [
        {
          categoryId: 1,
          value: '쌀',
        },
        {
          categoryId: 2,
          value: '찹쌀',
        },
        {
          categoryId: 3,
          value: '콩',
        },
	      {
          categoryId: 3,
          value: '팥',
        },
	      {
          categoryId: 3,
          value: '녹두',
        },
	      {
          categoryId: 3,
          value: '메밀',
        },
	      {
          categoryId: 3,
          value: '고구마',
        },
	      {
          categoryId: 3,
          value: '감자',
        },
      ]
    },
    {
      title: '채소류',
      items: [
        {
          categoryId: 4,
          value: '배추',
        },
        {
          categoryId: 5,
          value: '양배추',
        },
        {
          categoryId: 6,
          value: '시금치',
        },
   	    {
          categoryId: 6,
          value: '상추',
        },
 	      {
          categoryId: 6,
          value: '얼갈이배추',
        },
        {
          categoryId: 6,
          value: '수박',
        },
        {
          categoryId: 6,
          value: '참외',
        },
{
          categoryId: 6,
          value: '오이',
        },
{
          categoryId: 6,
          value: '호박',
        },
{
          categoryId: 6,
          value: '토마토',
        },
{
          categoryId: 6,
          value: '딸기',
        },
{
          categoryId: 6,
          value: '무',
        },
{
          categoryId: 6,
          value: '당근',
        },
{
          categoryId: 6,
          value: '열무',
        },
{
          categoryId: 6,
          value: '건고추',
        },
{
          categoryId: 6,
          value: '풋고추',
        },
{
          categoryId: 6,
          value: '붉은고추',
        },
{
          categoryId: 6,
          value: '피마늘',
        },
{
          categoryId: 6,
          value: '깐마늘',
        },
{
          categoryId: 6,
          value: '양파',
        },
{
          categoryId: 6,
          value: '파',
        },
{
          categoryId: 6,
          value: '생강',
        },
{
          categoryId: 6,
          value: '미나리',
        },
{
          categoryId: 6,
          value: '깻잎',
        },
{
          categoryId: 6,
          value: '피망',
        },
{
          categoryId: 6,
          value: '파프리카',
        },
{
          categoryId: 6,
          value: '멜론',
        },
{
          categoryId: 6,
          value: '방울토마토',
        },
      ]
    },
 {
      title: '특용작물',
      items: [
        {
          categoryId: 4,
          value: '참깨',
        },
        {
          categoryId: 5,
          value: '들깨',
        },
        {
          categoryId: 6,
          value: '땅콩',
        },
   {
          categoryId: 6,
          value: '느타리버섯',
        },
   {
          categoryId: 6,
          value: '팽이버섯',
        },
   {
          categoryId: 6,
          value: '새송이버섯',
        },
      ]
    },
 {
      title: '과일류',
      items: [
        {
          categoryId: 4,
          value: '사과',
        },
        {
          categoryId: 5,
          value: '배',
        },
        {
          categoryId: 6,
          value: '복숭아',
        },
 {
          categoryId: 6,
          value: '포도',
        },
 {
          categoryId: 6,
          value: '감귤',
        },
 {
          categoryId: 6,
          value: '단감',
        },
 {
          categoryId: 6,
          value: '바나나',
        },
 {
          categoryId: 6,
          value: '참다래',
        },
 {
          categoryId: 6,
          value: '파인애플',
        },
 {
          categoryId: 6,
          value: '오렌지',
        },
 {
          categoryId: 6,
          value: '레몬',
        },
 {
          categoryId: 6,
          value: '체리',
        },
 {
          categoryId: 6,
          value: '망고',
        },
      ]
    },
 {
      title: '수산물',
      items: [
        {
          categoryId: 4,
          value: '고등어',
        },
        {
          categoryId: 5,
          value: '갈치',
        },
        {
          categoryId: 6,
          value: '명태',
        },
 {
          categoryId: 6,
          value: '물오징어',
        },
 {
          categoryId: 6,
          value: '건멸치',
        },
 {
          categoryId: 6,
          value: '북어',
        },
 {
          categoryId: 6,
          value: '건오징어',
        },
 {
          categoryId: 6,
          value: '김',
        },
 {
          categoryId: 6,
          value: '건미역',
        },
 {
          categoryId: 6,
          value: '굴',
        },
 {
          categoryId: 6,
          value: '전복',
        },
 {
          categoryId: 6,
          value: '새우',
        },
      ]
    }
  ];
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const requestItemsByCategory = (categoryValue: string): void => {
    if(query.sort) {
      window.location.href = `/main/product?category=${categoryValue}&sort=${query.sort}`
    }else {
      window.location.href = `/main/product?category=${categoryValue}`
    }
  }

  const categoryItem = (item: categoryItem, index: number): ReactElement => {
    if(item.value.toString() === query.category) {
      return(
        <CategoryItem key={`item__${index}`}>
          <div className="selected">{item.value}</div>
        </CategoryItem>
      );
    }

    return(
      <CategoryItem key={`item__${index}`} onClick={(): void => requestItemsByCategory(item.value)}>
        <div className="unselected">{item.value}</div>
      </CategoryItem>
    );
  }

  const categoryRow = (c: CategoryType, index: number): ReactElement => {
    return (
      <div key={`item__${index}`} className="row">
        <div className="title">{c.title}</div>
        <div className="items">
          {c.items.map((i, index) => categoryItem(i, index))}
        </div>
      </div>
    );
  }
  
  return (
    <Container>
      <RowWrapper>
        <Category>
          {
            category.map((c, index) => categoryRow(c, index))
          }
        </Category>
      </RowWrapper>
      <RowWrapper style={{ marginLeft: 5 }}>
        {sortItems.map((item, index) => sortElement(index))}
      </RowWrapper>
      <div style={{ width: '100%' }}>
        {productItemsElement()}
      </div>
    </Container>
  );
}

export default Page;