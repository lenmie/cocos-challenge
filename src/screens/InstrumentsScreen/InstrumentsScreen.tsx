import React from 'react';
import { Text, FlatList } from 'react-native';
import { useGetInstrumentsQuery } from '../../store/api/api';
import { CommonScreenContainer, CommonText } from '../../components';
import { ActivityIndicator } from 'react-native';
import { InstrumentItem } from './InstrumentItem';
import { ItemSeparator } from './InstrumentsScreen.styles';

export const InstrumentsScreen = () => {
  const { data: instruments, isLoading, error } = useGetInstrumentsQuery();

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
        <CommonText>Error fetching instruments</CommonText>
      </CommonScreenContainer>
    );
  }

  return (
    <CommonScreenContainer>
      <FlatList
        data={instruments}
        keyExtractor={item => item.id.toString()}
        renderItem={InstrumentItem}
        //contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={<Text>No instruments available</Text>}
        showsVerticalScrollIndicator={false}
      />
    </CommonScreenContainer>
  );
};
