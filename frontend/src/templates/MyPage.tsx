import React, { ReactElement, useEffect, useState } from 'react';

import { User } from '../types'
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  color: #333333;
  margin-bottom: 10px;
`;

const Info = styled.div`
  font-size: 20px;
  color: #333333;
  margin-bottom: 20px;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #efefef;
  border-radius: 10px;
  margin-bottom: 20px;

  .row {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    color: #333333;

    .title {
      width: 100px;
      margin-right: 10px;
    }

    .content {
    }
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  padding: 10px;
  background-color: #00a457;
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

function Page() {
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

  useEffect(() => {
    getUser();
  }, []);


  const logout = (): void => {
    window.localStorage.removeItem("user");
    window.location.href = "/auth/signIn"
  }

  return (
    <Container>
      <Title>개인정보</Title>
      <Info>{user?.userName} 사장님, 안녕하세요! 수정하기를 통해 개인정보를 수정할 수 있습니다.</Info>
      <Content>
        <div className="row">
          <div className="title">이름</div>
          <div className="content">{user?.userName}</div>
        </div>
        <div className="row">
          <div className="title">연락처</div>
          <div className="content">{user?.phoneNum}</div>
        </div>
        <div className="row">
          <div className="title">사업체이름</div>
          <div className="content">{user?.storeName}</div>
        </div>
        <div className="row">
          <div className="title">배송주소</div>
          <div className="content">{user?.address}</div>
        </div>
      </Content>
      <Button>
        개인정보 수정하기
      </Button>
      <Button onClick={(): void => logout()}>
        로그아웃
      </Button>
    </Container>
  );
}

export default Page;