import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGetInstrumentsQuery } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';

export const InstrumentsScreen = () => {
  const { data: instruments, isLoading, error } = useGetInstrumentsQuery();

  const renderItem = ({ item }: { item: Instrument }) => (
    <View style={styles.itemContainer}>
      <Text>{item.ticker}</Text>
      <Text>{item.name}</Text>
      <Text>{item.lastPrice}</Text>
    </View>
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

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});