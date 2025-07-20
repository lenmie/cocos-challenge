import React from 'react';
import { Text, FlatList } from 'react-native';
import { useGetInstrumentsQuery } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { ItemContainer, InstrumentText } from './InstrumentsScreen.styles';
import { CommonScreenContainer } from '../../components';

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
    <CommonScreenContainer>
      <FlatList
        data={instruments}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text>No instruments available</Text>}
        showsVerticalScrollIndicator={false}
      />
    </CommonScreenContainer>
  );
};
