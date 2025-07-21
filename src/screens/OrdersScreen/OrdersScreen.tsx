import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useSearchInstrumentsQuery } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { Input, ItemContainer } from './OrdersScreen.styles';
import { CommonScreenContainer, CommonText } from '../../components';
import { OrderItem } from './OrderItem';
import { OrderModal } from './OrderModal';

export const OrdersScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  const {
    data: instruments,
    isLoading,
    error,
  } = useSearchInstrumentsQuery(query.toUpperCase(), {
    skip: !query,
  });

  if (isLoading && !query)
    return (
      <CommonScreenContainer>
        <ActivityIndicator size="large" />
      </CommonScreenContainer>
    );
  if (error)
    return (
      <CommonScreenContainer>
        <CommonText>Error searching instruments</CommonText>
      </CommonScreenContainer>
    );

  return (
    <CommonScreenContainer>
      <Input
        placeholder="Search by ticker"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={instruments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            item={item}
            setSelectedInstrument={setSelectedInstrument}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <ItemContainer />}
        ListEmptyComponent={<CommonText>No instruments found</CommonText>}
        showsVerticalScrollIndicator={false}
      />

      <OrderModal
        selectedInstrument={selectedInstrument}
        onClose={() => setSelectedInstrument(null)}
      />
    </CommonScreenContainer>
  );
};
