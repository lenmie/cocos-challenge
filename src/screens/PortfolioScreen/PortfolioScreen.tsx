import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useGetPortfolioQuery } from '../../store/api/api';
import { Portfolio } from '../../domain/models/portfolio';
import { ItemSeparator } from './PortfolioScreen.styles';
import { CommonScreenContainer, CommonText } from '../../components';
import { PortfolioItem } from './PortfolioItem';

export const PortfolioScreen = () => {
  const { data: portfolio, isLoading, error } = useGetPortfolioQuery();

  if (isLoading) {
    return (
      <CommonScreenContainer>
        <ActivityIndicator size={'large'} />
      </CommonScreenContainer>
    );
  }

  if (error) {
    return (
      <CommonScreenContainer>
        <CommonText>Error fetching portfolio</CommonText>
      </CommonScreenContainer>
    );
  }

  return (
    <CommonScreenContainer>
      <FlatList
        data={portfolio}
        // entities ids sometimes are duplicated, thus using index as key
        keyExtractor={(_, index) => index.toString()}
        renderItem={PortfolioItem}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={<Text>No portfolio data available</Text>}
        showsVerticalScrollIndicator={false}
      />
    </CommonScreenContainer>
  );
};
