import React, { ReactElement, useState } from 'react';

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
    width: 300px;

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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImagePreviewWrapper = styled.button`
  outline: none;
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  border-radius: 10px;

  label {
    font-weight: bold;
    color: white;
    font-size: 20px;
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

const ImagePrivew = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #efefef;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ImageUploadItem = styled.div`
  .title {
    font-size: 24px;
    color: #333333;
    margin: 10px 0;
  }
`;

function Page() {
  const [stage, setStage] = useState<number>(0);
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>();

  const stageItems: string[] = ["상품설명 및 이미지 등록", "가격 및 계좌정보 입력"];

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

  const getImagePreview = (imageUrl?: string): ReactElement => {
    if(imageUrl) {
      return (
        <ImagePrivew>
          <img src={imageUrl} alt="" />
        </ImagePrivew>
      );
    }

    return (
      <ImagePreviewWrapper>
        <label>이미지 추가<input type="file" accept="image/jpeg, image/png" onChange={(e) => handleFileOnChange(e)}/></label>
      </ImagePreviewWrapper>
    );
  }

  return (
    <Container>
      <Row>
        {
          stageItems.map((item, index) => getStageElement(index))
        }
      </Row>
      <div>
        <img src="https://user-images.githubusercontent.com/31176502/87874633-438ab600-ca06-11ea-9b38-60a9dc5cf896.png" alt="" style={{ width: '100%', height: '100%' }} />
      </div>
      <div>
        <img src="https://user-images.githubusercontent.com/31176502/87874666-8e0c3280-ca06-11ea-916f-ca858b5bf0cb.png" alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      
      {/* <RowWrapper style={{ marginTop: 35, marginBottom: 35 }}>
        <ImageUploadItem>
          <div className="title">대표이미지</div>
          <div style={{ width: 200, height: 200 }}>
          {getImagePreview()}
          </div>
        </ImageUploadItem>
        <ImageUploadItem style={{ marginLeft: 20 }}>
          <div className="title">상품명</div>
          <RowWrapper>
            <div style={{ width: 200, height: 200 }}>
              {getImagePreview()}
            </div>
            <div style={{ width: 200, height: 200 }}>
              {getImagePreview()}
            </div>
          </RowWrapper>
        </ImageUploadItem>
      </RowWrapper> */}
    </Container>
  );
}

export default Page;