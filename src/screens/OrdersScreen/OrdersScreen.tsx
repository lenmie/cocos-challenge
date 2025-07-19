import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { useSearchInstrumentsQuery, useCreateOrderMutation } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { OrderDTO, OrderSide, OrderType } from '../../store/api/dtos/order.dto';

export const OrdersScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [side, setSide] = useState<OrderSide>('BUY');
  const [type, setType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const { data: instruments, isLoading, error } = useSearchInstrumentsQuery(query, {
    skip: !query,
  });
  const [createOrder, { data: orderResponse, isLoading: isCreatingOrder, error: createOrderError }] = useCreateOrderMutation();

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
      <View style={styles.itemContainer}>
        <Text>{item.ticker}</Text>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by ticker"
        value={query}
        onChangeText={setQuery}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error searching instruments</Text>}
      <FlatList
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
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
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Order</Text>
          <Text>Side</Text>
          <Button title="Buy" onPress={() => setSide('BUY')} />
          <Button title="Sell" onPress={() => setSide('SELL')} />

          <Text>Type</Text>
          <Button title="Market" onPress={() => setType('MARKET')} />
          <Button title="Limit" onPress={() => setType('LIMIT')} />

          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          {type === 'LIMIT' && (
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          )}

          <Button title="Create Order" onPress={handleCreateOrder} disabled={isCreatingOrder} />

          {orderResponse && (
            <View>
              <Text>Order ID: {orderResponse.id}</Text>
              <Text>Status: {orderResponse.status}</Text>
            </View>
          )}

          {createOrderError && <Text>Error creating order</Text>}

          <Button title="Close" onPress={() => setSelectedInstrument(null)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
