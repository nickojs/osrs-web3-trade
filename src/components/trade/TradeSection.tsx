import { Item } from '../inventory/interfaces';
import ItemWrapper from '../inventory/ItemWrapper';
import {
 RecipientAck, Text, TradeItemsContainer, TradeSection
} from './styles';

interface TradeSectionProps {
  title: string;
  items: Item[];
  type: 'current' | 'target';
  // eslint-disable-next-line react/require-default-props
  removeItemHandler?: (item: Item) => void;
  ackMsg: string;
}

export default (props: TradeSectionProps) => {
  const {
    title, items, type, ackMsg, removeItemHandler
  } = props;

  return (
    <TradeSection type={type} isLocked={!!ackMsg}>
      <Text>{title}</Text>
      <TradeItemsContainer>
        {items.map((item) => (
          <ItemWrapper
            key={item.id}
            item={item}
            indicator="trade"
            onClick={removeItemHandler
              ? () => removeItemHandler(item)
              : undefined}
          />
        ))}
      </TradeItemsContainer>
      {ackMsg && (
        <RecipientAck>
          {ackMsg}
        </RecipientAck>
      )}
    </TradeSection>
    );
};
