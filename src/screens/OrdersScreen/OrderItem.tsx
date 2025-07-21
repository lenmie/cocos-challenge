import { TouchableOpacity } from 'react-native';
import { Instrument } from '../../domain/models/instrument';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

const ItemContainer = styled.View`
  flex: 1;
  flex-direction: row;
  
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.tertiary};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.tertiary};
`;

const LeftContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const RightContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const OrderText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

const ValueText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;

export const OrderItem = ({
  item,
  setSelectedInstrument,
}: {
  item: Instrument;
  setSelectedInstrument: (instrument: Instrument | null) => void;
}) => (
  <TouchableOpacity onPress={() => setSelectedInstrument(item)}>
    <ItemContainer>
      <LeftContainer>
        <OrderText>{item.ticker}</OrderText>
        <ValueText>{item.name}</ValueText>
      </LeftContainer>

      <RightContainer>
        <ValueText>Last Price: ${item.lastPrice}</ValueText>
        <ValueText>Close Price: ${item.closePrice}</ValueText>
      </RightContainer>
    </ItemContainer>
  </TouchableOpacity>
);
