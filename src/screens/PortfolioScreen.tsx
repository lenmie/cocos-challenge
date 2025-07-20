import React from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useGetPortfolioQuery } from '../../store/api/api';
import { Portfolio } from '../../domain/models/portfolio';

const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const PortfolioScreen = () => {
  const { data: portfolio, isLoading, error } = useGetPortfolioQuery();

  const renderItem = ({ item }: { item: Portfolio }) => (
    <ItemContainer>
      <Text>{item.ticker}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.marketValue.toFixed(2)}</Text>
      <Text>{item.gain.toFixed(2)}</Text>
      <Text>{item.totalReturn.toFixed(2)}%</Text>
    </ItemContainer>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching portfolio</Text>;
  }

  return (
    <FlatList
      data={portfolio?.map(
        (item) =>
          ({
            ...item,
            marketValue: item.quantity * item.last_price,
            gain: item.quantity * (item.last_price - item.avg_cost_price),
            totalReturn:
              (item.last_price / item.avg_cost_price - 1) * 100,
          } as Portfolio)
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
