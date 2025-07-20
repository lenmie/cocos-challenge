import React from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useGetInstrumentsQuery } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';

const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const InstrumentsScreen = () => {
  const { data: instruments, isLoading, error } = useGetInstrumentsQuery();

  const renderItem = ({ item }: { item: Instrument }) => (
    <ItemContainer>
      <Text>{item.ticker}</Text>
      <Text>{item.name}</Text>
      <Text>{item.lastPrice}</Text>
    </ItemContainer>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching instruments</Text>;
  }

  return (
    <FlatList
      data={instruments?.map(
        instrument =>
          ({
            ...instrument,
            return: (instrument.last_price / instrument.close_price - 1) * 100,
          } as Instrument),
      )}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};
