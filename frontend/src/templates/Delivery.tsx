import React, { ReactElement } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

function Page() {
  return (
    <Container>
      <img style={{ width: '100%', height: '100%' }} src={"https://user-images.githubusercontent.com/31176502/87872759-585f4d80-c9f6-11ea-9c56-237c79cfa2b9.png"} alt="" />
    </Container>
  );
}

export default Page;