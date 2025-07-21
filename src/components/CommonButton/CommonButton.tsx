import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';
import { CommonText } from '../CommonText';

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }: { theme: DefaultTheme; disabled?: boolean }) => 
    disabled ? '#9CA3AF' : theme.secondary};
  padding: 12px 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  opacity: ${({ disabled }: { disabled?: boolean }) => disabled ? 0.6 : 1};
`;

export const CommonButton = ({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button onPress={onPress} disabled={disabled}>
      <CommonText>{title}</CommonText>
    </Button>
  );
};
