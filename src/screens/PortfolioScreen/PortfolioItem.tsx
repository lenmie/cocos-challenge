import styled from 'styled-components/native';
import { Portfolio } from '../../domain/models/portfolio';
import { DefaultTheme } from 'styled-components';

const ItemContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.tertiary};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.tertiary};
`;

const LeftContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-right: 16px;
`;

const RightContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const TickerName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

const ValueText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

export const PortfolioItem = ({ item }: { item: Portfolio }) => (
  <ItemContainer>
    <LeftContainer>
      <TickerName>{item.ticker}</TickerName>
      <ValueText>Quantity: {item.quantity}</ValueText>
    </LeftContainer>

    <RightContainer>
      <ValueText>Value: ${item.marketValue.toFixed(2)}</ValueText>
      <ValueText>Gain: ${item.gain.toFixed(2)}</ValueText>
      <ValueText>Total Return: {item.totalReturn.toFixed(2)}%</ValueText>
    </RightContainer>
  </ItemContainer>
);
