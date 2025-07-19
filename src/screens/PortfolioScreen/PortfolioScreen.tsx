import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGetPortfolioQuery } from '../../store/api/api';
import { Portfolio } from '../../domain/models/portfolio';

export const PortfolioScreen = () => {
  const { data: portfolio, isLoading, error } = useGetPortfolioQuery();

  const renderItem = ({ item }: { item: Portfolio }) => (
    <View style={styles.itemContainer}>
      <Text>{item.ticker}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.marketValue.toFixed(2)}</Text>
      <Text>{item.gain.toFixed(2)}</Text>
      <Text>{item.totalReturn.toFixed(2)}%</Text>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching portfolio</Text>;
  }

  console.log('Portfolio data:', portfolio);
  
  return (
    <FlatList
      data={portfolio}
      //keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={<Text>No portfolio data available</Text>}
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