import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, Modal, Button } from 'react-native';
import styled from 'styled-components/native';
import {
  useSearchInstrumentsQuery,
  useCreateOrderMutation,
} from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { OrderDTO, OrderSide, OrderType } from '../../store/api/dtos/order.dto';
import { Theme } from '../../theme/theme';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.background};
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: ${({ theme }: { theme: Theme }) => theme.tertiary};
  border-width: 1px;
  margin-bottom: 16px;
  padding-horizontal: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.text};
`;

const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.tertiary};
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.background};
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.text};
`;

const OrderText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.text};
`;

export const OrdersScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);
  const [side, setSide] = useState<OrderSide>('BUY');
  const [type, setType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const {
    data: instruments,
    isLoading,
    error,
  } = useSearchInstrumentsQuery(query, {
    skip: !query,
  });
  const [
    createOrder,
    {
      data: orderResponse,
      isLoading: isCreatingOrder,
      error: createOrderError,
    },
  ] = useCreateOrderMutation();

  const handleCreateOrder = () => {
    if (!selectedInstrument) return;

    const order: OrderDTO = {
      instrument_id: selectedInstrument.id,
      side,
      type,
      quantity: parseInt(quantity, 10),
    };

    if (type === 'LIMIT') {
      order.price = parseFloat(price);
    }

    createOrder(order);
  };

  const renderItem = ({ item }: { item: Instrument }) => (
    <TouchableOpacity onPress={() => setSelectedInstrument(item)}>
      <ItemContainer>
        <OrderText>{item.ticker}</OrderText>
        <OrderText>{item.name}</OrderText>
      </ItemContainer>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Input
        placeholder="Search by ticker"
        value={query}
        onChangeText={setQuery}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error searching instruments</Text>}
      <FlatList
        data={instruments}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text>No instruments found</Text>}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedInstrument}
        onRequestClose={() => setSelectedInstrument(null)}
        animationType="slide"
      >
        <ModalContainer>
          <ModalTitle>Create Order</ModalTitle>
          <Text>Side</Text>
          <Button title="Buy" onPress={() => setSide('BUY')} />
          <Button title="Sell" onPress={() => setSide('SELL')} />

          <Text>Type</Text>
          <Button title="Market" onPress={() => setType('MARKET')} />
          <Button title="Limit" onPress={() => setType('LIMIT')} />

          <Input
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          {type === 'LIMIT' && (
            <Input
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          )}

          <Button
            title="Create Order"
            onPress={handleCreateOrder}
            disabled={isCreatingOrder}
          />

          {orderResponse && (
            <>
              <OrderText>Order ID: {orderResponse.id}</OrderText>
              <OrderText>Status: {orderResponse.status}</OrderText>
            </>
          )}

          {createOrderError && <Text>Error creating order</Text>}

          <Button title="Close" onPress={() => setSelectedInstrument(null)} />
        </ModalContainer>
      </Modal>
    </Container>
  );
};
