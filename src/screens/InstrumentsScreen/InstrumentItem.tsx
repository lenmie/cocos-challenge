import styled from 'styled-components/native';
import { Instrument } from '../../domain/models/instrument';
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

const InstrumentName = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

const LastPriceText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  font-size: 20px;
  font-weight: bold;
`;

const TickerName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

export const InstrumentItem = ({ item }: { item: Instrument }) => (
  <ItemContainer>
    <LeftContainer>
      <TickerName>{item.ticker}</TickerName>
      <InstrumentName>{item.name}</InstrumentName>
    </LeftContainer>

    <RightContainer>
      <LastPriceText>{`$${item.lastPrice}`}</LastPriceText>
    </RightContainer>
  </ItemContainer>
);
