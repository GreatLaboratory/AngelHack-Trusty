import { CategoryType, ProductItemType, SortType, categoryItem } from '../types'
import React, { ReactElement, useEffect, useState } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { ProductItem } from '../components'
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

  const productItems: ProductItemType[] = [
    {
      prouductId: 1,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영ㅁㅇㄹㅁㄴㄹㅁㅇㄹㄴㅇㄹ농',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
    {
      prouductId: 2,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영농조합 해남 절임배추',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
    {
      prouductId: 3,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영농조합 해남 절임배추',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
    {
      prouductId: 4,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영농조합 해남 절임배추',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
    {
      prouductId: 5,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영농조합 해남 절임배추',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
    {
      prouductId: 6,
      productImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      price: 20000,
      productTitle: '해남들 영농조합 해남 절임배추',
      sellerProfileImage: 'http://black-up.kr/web/product/big/20200601/efc1cc4dfa7936daf82c12d9aef9400e.jpg',
      location: '전남 해남',
      sellerName: '백진욱',
    },
  ];


  const productItemsRow = (items: ProductItemType[], i: number): ReactElement => {
    return (
      <RowWrapper key={`item__${i}`}>
        {items.map((item, index) => <ProductItem key={`item${index}`} item={item} clickCart={(): void => alert('장바구니에 담겼습니다.')} />)}
      </RowWrapper>
    );
  }

  const productItemsElement = (): ReactElement[] => {
    let rtn: ReactElement[] = [];

    for (let i=0; i<=productItems.length/5; i++) {
      let end = i*5 + 5;
      if(i === productItems.length/5) {
        end = productItems.length;
      }
      const tmpItems = productItems.slice(i*5, end);

      rtn = [...rtn,productItemsRow(tmpItems, i)];
    }

    return rtn;
  }

  const query = queryString.parse(props.location.search);


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
          value: '깐마늘(국산)',
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

  // Related to category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const requestItemsByCategory = (categoryValue: string): void => {
    if(query.sort) {
      window.location.href = `/main/product?category=${categoryValue}&sort=${query.sort}`
    }else {
      window.location.href = `/main/product?category=${categoryValue}`
    }
  }

  const categoryItem = (item: categoryItem, index: number): ReactElement => {
    if(item.categoryId.toString() === query.category) {
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