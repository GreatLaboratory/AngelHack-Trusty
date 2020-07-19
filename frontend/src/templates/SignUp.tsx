import React, { ReactElement, useState } from 'react';

import { Button } from '../components'
import { UserType } from '../types'
import axios from 'axios'
import logo from '../assets/images/logo@3x.png'
import plusIcon from '../assets/images/plusIcon.png';
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
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px;
`;

const Logo = styled.div`
  width: 121px;
  height: 81px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 45px;
`;

const Left = styled.div`
  width: 350px;
  text-align: left;
  font-size: 30px;
  color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-right: 40px;
`;

const Right = styled.div`
  flex: 1;
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const UserTypeButton = styled.button` 
  width: 78px;
  height: 78px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => props.color || "#00a457"};
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: solid 1px #999999;
  &::placeholder {
    font-size: 16px;
    text-align: left;
    color: #999999;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
  }
`;

const ImageUploadButton = styled.div`
  border-radius: 10px;
  border: solid 1px #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;

  label {
    font-size: 16px;
    font-weight: 300;
    color: #999999;
  }
  
  input {
    position: absolute; 
    width: 1px; 
    height: 1px; 
    padding: 0; 
    margin: -1px; 
    overflow: hidden; 
    clip:rect(0,0,0,0); 
    border: 0;
  }
`;



function Page() {
  const [userType, setUserType] = useState<UserType>(UserType.USER);
  const [id, setId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [image, setImage] = useState<any>();
  const [name, setName] = useState<string>();
  const [phoneNum, setPhoneNum] = useState<string>();
  const [storeName, setStoreName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [verifyNumFromClient, setVerifyNumFromClient] = useState<string>();
  const [mainItem, setMainItem] = useState<string>();
  const [productArea, setProductArea] = useState<string>();

  const signUp = (): void => {
    // if(!file || !name || !phoneNum || !password || !storeName || !address || !id) {
    //   alert('폼을 다 채워주세요 :)');
    //   return;
    // }

    if(userType === UserType.USER) {
      const form = new FormData();
      form.append('image', file);
      form.append('id', (id || ''));
      form.append('name', (name || ''));
      form.append('phoneNum', (phoneNum || ''));
      form.append('password', (password || ''));
      form.append('storeName', (storeName || ''));
      form.append('address', (address || ''));

      axios.post('http://localhost:5000/api/user/signUp', form)
      .then(res => {
        console.log(res);
        if(res.status === 201) {
          alert('회원가입 성공!');
          window.location.href = 'http://localhost:3000/auth'
        }
      })
      .catch(error => console.log(error));
    } else {
      const form = new FormData();
      form.append('image', file);
      form.append('id', (id || ''));
      form.append('name', (name || ''));
      form.append('phoneNum', (phoneNum || ''));
      form.append('password', (password || ''));
      form.append('productArea', (productArea || ''));
      form.append('mainItem', (mainItem || ''));
      form.append('accountNum', ('210-123456-54321'));
      form.append('bankName', ('국민은행'));

      axios.post('http://localhost:5000/api/seller/signUp', form)
      .then(res => {
        console.log(res);
        if(res.status === 201) {
          alert('회원가입 성공!');
          window.location.href = 'http://localhost:3000/auth'
        }
      })
      .catch(error => console.log(error));
    }
  }  

  const [file, setFile] = useState<any>();
  // const [previewURL, setPreviewURL] = useState<string>();

  const handleFileOnChange = (event: any): void => {
    console.log(event.target.files[0]);
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const verifyPhoneNumber = (): void => {
    axios.post('http://localhost:5000/api/user/auth/sendCode', {
      "phoneNum": phoneNum,
    })
    .then(res => {
      const { status, data } = res;
      if(status === 201) {
        alert('인증코드를 발송했습니다. 입력해주세요!');
      }
    })
  }

  return (
    <Container>
      <Wrapper>
        <Logo>
          <img src={logo} alt="" />
        </Logo>
        <ContentWrapper>
          <Left>
            <div>회원가입</div>
            <ImagePreview>
              {
                image
                ? <img src={image} alt="" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                : <img src={plusIcon} alt="" />
              }
              
            </ImagePreview>
            <ImageUploadButton>
              <label>이미지 업로드<input type="file" accept="image/jpeg, image/png" onChange={(e) => handleFileOnChange(e)}/></label>
            </ImageUploadButton>
          </Left>
          <Right>
            <div>
              <UserTypeButton 
                onClick={(): void => setUserType(UserType.USER)}
                style={{ marginRight: 10 }} 
                color={userType === UserType.USER ? undefined : '#cccccc' }>소상공인</UserTypeButton>
              <UserTypeButton 
                onClick={(): void => setUserType(UserType.SELLER)}
                color={userType === UserType.SELLER ? undefined : '#cccccc' }>영농인</UserTypeButton>
            </div>
            <RowWrapper style={{ marginTop: 20 }}>
              <Input 
                type="text" 
                placeholder="아이디를 입력해주세요." 
                value={id} 
                onChange={(e): void => setId(e.target.value)} 
                style={{ marginRight: 10 }}
              />
              <Button value="중복확인" click={signUp}  containerStyle={{ width: 150, fontSize: 16, padding: 10 }}/>
            </RowWrapper>
            <RowWrapper>
              <Input 
                type="text" 
                placeholder="비밀번호를 입력해주세요." 
                value={password} 
                onChange={(e): void => setPassword(e.target.value)} 
                style={{ marginRight: 10 }}
              />
              <Input 
                type="text" 
                placeholder="비밀번호를 다시 입력해주세요." 
                value={confirmPassword} 
                onChange={(e): void => setConfirmPassword(e.target.value)} 
                style={{ }}
              />
            </RowWrapper>
            <RowWrapper style={{ marginBottom: 20 }}>
              <Input 
                type="text" 
                placeholder="휴대폰 번호를 입력해주세요." 
                value={phoneNum} 
                onChange={(e): void => setPhoneNum(e.target.value)} 
                style={{ marginRight: 10 }}
              />
              {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button value="본인인증" click={signUp}  containerStyle={{ fontSize: 16, padding: 10, height: '100%' }}/>
                <Input 
                  type="text" 
                  placeholder="인증코드" 
                  value={verifyNumFromClient} 
                  onChange={(e): void => setVerifyNumFromClient(e.target.value)} 
                  style={{  marginLeft: 10 }}
                />
              </div> */}
              
            </RowWrapper>
            <RowWrapper>
              <Input 
                type="text" 
                placeholder="성함을 입력해주세요" 
                value={name} 
                onChange={(e): void => setName(e.target.value)} 
                style={{ marginRight: 10 }}
              />
              <Input 
                type="text" 
                placeholder="생산지를 입력해주세요." 
                value={storeName} 
                onChange={(e): void => setStoreName(e.target.value)} 
                style={{ }}
              />
            </RowWrapper>
            <RowWrapper style={{ marginBottom: 20 }}>
              <Input 
                type="text" 
                placeholder="주요품목을 입력해주세요." 
                value={mainItem} 
                onChange={(e): void => setMainItem(e.target.value)} 
                style={{ flex: 1 }}
              />
            </RowWrapper>
          </Right>
        </ContentWrapper>
        <Button value="가입하기" click={signUp}  containerStyle={{ width: '100%' }}/>
      </Wrapper>
    </Container>
  );
}

export default Page;