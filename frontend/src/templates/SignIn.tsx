import React, { ReactElement, useState } from 'react';

import { Button } from '../components';
import {Link} from 'react-router-dom'
import axios from 'axios';
import img from '../assets/images/sign_in.png'
import logo from '../assets/images/logo@3x.png'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 1000px;
  height: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
`;

const LeftWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
`;

const FormWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */

  .input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
  
    .title {
      font-size: 30px;
      color: #333333;
      margin-bottom: 20px;
    }

    input {
      padding: 20px;
      border-radius: 10px;
      border: solid 1px #999999;
      font-size: 18px;
      margin-bottom: 15px;
      
      &::placeholder {
        font-size: 18px;
        color: #999999;
      }
    }
  }
`;

const Image = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = styled.div`
  width: 151px;
  height: 111px;

  img {
    width: 100%;
    height: 100%;
  }
`;

function Page() {
  const [id, setId] = useState<string>("test1234");
  const [password, setPassword] = useState<string>("123");

  const signIn = (): void => {
    if(!id || !password) {
      alert("아이디/비밀번호를 확인해주세요.");
      return;
    }

    let form = new FormData();
    form.append("id", id);
    form.append("password", password);

    axios.post('http://localhost:5000/api/user/login', {
      "id": "test1234",
      "password": "123"
  })
    .then(res => {
      // const { status } = res;
      console.log(JSON.stringify(res));

      // 성공할 경우 user state에 담는다.
      // if(status === 200) {
      //   alert('로그인 성공');
      //   return;
      // }

      // if(status === 401) {
      //   alert('아이디/비밀번호를 확인해주세요.');
      // }
    })
  .catch( response => { console.log(response) } );
  };

  return (
    <Container>
      <Wrapper>
        <LeftWrapper>
          <Logo>
            <img src={logo} alt="" />
          </Logo>
          <FormWrapper>
            <div className="input-wrapper">
              <div className="title">로그인</div>
              <input type="text" placeholder="아이디를 입력해주세요." onChange={e => setId(e.target.value)} value={id} />
              <input type="password" placeholder="비밀번호를 입력해주세요." onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <Button value="로그인" click={signIn} containerStyle={{ marginBottom: 10, width: '100%' }} />
            <Link to="/auth/signUp" style={{ textDecoration: 'none' }}>
              <Button value="회원가입" isFilled={false} containerStyle={{ width: '100%'}} />
            </Link>
          </FormWrapper>
        </LeftWrapper>
        <Image>
          <img src={img} alt="" />
        </Image>
      </Wrapper>
    </Container>
  );
}

export default Page;