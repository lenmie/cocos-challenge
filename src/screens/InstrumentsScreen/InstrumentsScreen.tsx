import React from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useGetInstrumentsQuery } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { Theme } from '../../theme/theme';

const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: {theme: Theme}) => theme.tertiary};
  background-color: ${({ theme }: {theme: Theme}) => theme.background};
`;

const InstrumentText = styled.Text`
  color: ${({ theme }: {theme: Theme}) => theme.text};
`;

export const InstrumentsScreen = () => {
  const { data: instruments, isLoading, error } = useGetInstrumentsQuery();

  const renderItem = ({ item }: { item: Instrument }) => (
    <ItemContainer>
      <InstrumentText>{item.ticker}</InstrumentText>
      <InstrumentText>{item.name}</InstrumentText>
      <InstrumentText>{item.lastPrice}</InstrumentText>
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
      data={instruments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={<Text>No instruments available</Text>}
      showsVerticalScrollIndicator={false}
    />
  );
};