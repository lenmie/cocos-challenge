import React, { useState, useEffect } from 'react';
import { Modal, Button, ActivityIndicator, Switch } from 'react-native';
import { useCreateOrderMutation } from '../../store/api/api';
import { Instrument } from '../../domain/models/instrument';
import { OrderDTO, OrderSide, OrderType } from '../../store/api/dtos/order.dto';
import {
  Input,
  ModalContainer,
  ModalInputContainer,
  ModalRowContainer,
  ModalTitle,
  OrderText,
  SwitchContainer,
} from './OrdersScreen.styles';
import { CommonText } from '../../components';
import { CommonButton } from '../../components/CommonButton/CommonButton';

interface OrderModalProps {
  selectedInstrument: Instrument | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  selectedInstrument,
  onClose,
}) => {
  const [side, setSide] = useState<OrderSide>('BUY');
  const [type, setType] = useState<OrderType>('MARKET');
  const [transactionType, setTransactionType] = useState<'SHARES' | 'MONEY'>(
    'SHARES',
  );
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [
    createOrder,
    {
      data: orderResponse,
      isLoading: isCreatingOrder,
      error: createOrderError,
      reset: resetCreateOrder,
    },
  ] = useCreateOrderMutation();

  useEffect(() => {
    if (!selectedInstrument) {
      setSide('BUY');
      setType('MARKET');
      setQuantity('');
      setPrice('');
      resetCreateOrder();
    }
  }, [selectedInstrument, resetCreateOrder]);

  const handleCreateOrder = () => {
    if (!selectedInstrument) return;

    const quantityValue =
      transactionType === 'MONEY'
        ? Math.floor(parseInt(quantity) / selectedInstrument.lastPrice)
        : parseInt(quantity);

    const order: OrderDTO = {
      instrument_id: selectedInstrument.id,
      side,
      type,
      quantity: quantityValue,
    };

    if (type === 'LIMIT') {
      order.price = parseFloat(price);
    }

    createOrder(order);
  };

  return (
    <Modal
      visible={!!selectedInstrument}
      onRequestClose={onClose}
      animationType="slide"
    >
      <ModalContainer>
        <ModalTitle>Create Order</ModalTitle>
        <CommonText>Instrument: {selectedInstrument?.ticker}</CommonText>
        <ModalRowContainer>
          <CommonText>Side</CommonText>
          <SwitchContainer>
            <CommonText>{side === 'BUY' ? 'Buy' : 'Sell'}</CommonText>
            <Switch
              value={side === 'BUY'}
              onValueChange={value => setSide(value ? 'BUY' : 'SELL')}
            />
          </SwitchContainer>
        </ModalRowContainer>

        <ModalRowContainer>
          <CommonText>{type === 'MARKET' ? 'Market' : 'Limit'}</CommonText>
          <SwitchContainer>
            <CommonText>Type</CommonText>
            <Switch
              value={type === 'MARKET'}
              onValueChange={value => setType(value ? 'MARKET' : 'LIMIT')}
            />
          </SwitchContainer>
        </ModalRowContainer>

        <ModalRowContainer>
          <CommonText>Transaction Type</CommonText>
          <SwitchContainer>
            <CommonText>
              {transactionType === 'SHARES' ? 'By Quantity' : 'By Money'}
            </CommonText>
            <Switch
              value={transactionType === 'SHARES'}
              onValueChange={value =>
                setTransactionType(value ? 'SHARES' : 'MONEY')
              }
            />
          </SwitchContainer>
        </ModalRowContainer>

        <ModalInputContainer>
          <Input
            placeholder={transactionType === 'SHARES' ? 'Quantity' : '$'}
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
        </ModalInputContainer>

        <CommonButton
          title="Create Order"
          onPress={handleCreateOrder}
          disabled={
            isCreatingOrder || !quantity || (type === 'LIMIT' && !price)
          }
        />

        {isCreatingOrder && <ActivityIndicator size="small" />}

        {orderResponse && (
          <>
            <OrderText>Order ID: {orderResponse.id}</OrderText>
            <OrderText>Status: {orderResponse.status}</OrderText>
          </>
        )}

        {createOrderError && <CommonText>Error creating order</CommonText>}

        <CommonButton title="Close" onPress={onClose} />
      </ModalContainer>
    </Modal>
  );
};
