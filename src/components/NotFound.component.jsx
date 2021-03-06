import React from "react";
import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { earth } from "ionicons/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Icon = styled(IonIcon)`
  font-size: 8rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
`;

function NotFound(props) {
  const { title, message } = props;
  return (
    <Container>
      <Icon icon={earth} />
      <Title>{title || '404 Not Found'}</Title>
      <Message>{message || 'We weren´t able to find this content.'}</Message>
    </Container>
  );
}

export default NotFound;
