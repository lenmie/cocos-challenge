import React from 'react';
import { Container } from './CommonScreenContainer.styles';

export const CommonScreenContainer = (props: { children: React.ReactNode }) => {
  return <Container>{props.children}</Container>;
};
