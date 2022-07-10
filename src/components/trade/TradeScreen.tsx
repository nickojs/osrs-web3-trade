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
 TradeTitle,
 RecipientAck
} from './styles';

export interface TradeScreenProps {
  receivingItems: Item[],
  sendingItems: Item[],
  recipientName: string,
  recipientAccept: boolean,
  senderAccept: boolean
}

export default ({
 receivingItems,
 sendingItems,
 recipientName,
 recipientAccept,
 senderAccept
}: TradeScreenProps) => (
  <TradeGrid hasAccepted={senderAccept}>
    <TradeTitle>
      <Title>
        {recipientName
              ? `Trading with: ${recipientName}`
              : 'Waiting user to connect...'}
      </Title>
    </TradeTitle>
    <YourTrade>
      <Text>Your offer</Text>
      <TradeItemsContainer>
        {sendingItems.map((item) => (
          <ItemWrapper key={item.id} item={item} />
          ))}
      </TradeItemsContainer>
      {senderAccept && (
      <RecipientAck>
        you accepted the trade
      </RecipientAck>
        )}
    </YourTrade>
    <OtherTrade>
      <Text>
        {recipientName}
        {' '}
        offer
      </Text>
      <TradeItemsContainer>
        {receivingItems.map((item) => (
          <ItemWrapper key={item.id} item={item} />
          ))}
      </TradeItemsContainer>

      {recipientAccept && (
      <RecipientAck>
        {recipientName}
        {' '}
        has accepted the trade
      </RecipientAck>
        )}

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
