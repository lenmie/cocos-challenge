import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { useGetPortfolioQuery } from '../../store/api/api';
import { Portfolio } from '../../domain/models/portfolio';
import { Theme } from '../../theme/theme';

const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.tertiary};
  background-color: ${({ theme }: { theme: Theme }) => theme.background};
`;

const TickerText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.text};
`;

export const PortfolioScreen = () => {
  const { data: portfolio, isLoading, error } = useGetPortfolioQuery();

  const renderItem = ({ item }: { item: Portfolio }) => (
    <ItemContainer>
      <TickerText>{item.ticker}</TickerText>
      <TickerText>{item.quantity}</TickerText>
      <TickerText>{item.marketValue.toFixed(2)}</TickerText>
      <TickerText>{item.gain.toFixed(2)}</TickerText>
      <TickerText>{item.totalReturn.toFixed(2)}%</TickerText>
    </ItemContainer>
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
