import { Item } from '../inventory/interfaces';
import ItemWrapper from '../inventory/ItemWrapper';
import {
 Button,
 ButtonContainer,
 YourTrade,
 OtherTrade,
 Title,
 Text,
 TradeGrid,
 TradeItemsContainer,
 TradeTitle
} from './styles';

export interface TradeScreenProps {
  receivingItems: Item[],
  sendingItems: Item[],
  recipientName: string
}

export default ({ receivingItems, sendingItems, recipientName }: TradeScreenProps) => {
  console.log('hi ');

  return (
    <TradeGrid>
      <TradeTitle>
        <Title>
          {recipientName
              ? `Trading with: ${recipientName}`
              : `Waiting ${recipientName} to connect...`}
        </Title>
      </TradeTitle>
      <YourTrade>
        <Text>Your offer</Text>
        <TradeItemsContainer>
          {sendingItems.map((item) => (
            <ItemWrapper item={item} />
          ))}
        </TradeItemsContainer>

      </YourTrade>
      <OtherTrade>
        <Text>
          {recipientName}
          {' '}
          offer
        </Text>
        <TradeItemsContainer>
          {receivingItems.map((item) => (
            <ItemWrapper item={item} />
          ))}
        </TradeItemsContainer>

        {/* {recipientAck && (
          <p>
            {recipientName}
            {' '}
            has accepted the trade
          </p>
        )} */}

      </OtherTrade>
      <ButtonContainer>
        <Button
          // disabled={!allowTrade}
          // onClick={onAccept}
          color="lime"
        >
          Accept
        </Button>
        <Button
          // onClick={onDecline}
          color="red"
        >
          Decline
        </Button>
      </ButtonContainer>
    </TradeGrid>
  );
};
