import { User } from '../../context/AuthContext';
import { Item } from '../inventory/interfaces';
import {
 Button,
 ButtonContainer,
 InventoryData,
 YourTrade,
 OtherTrade,
 Title,
 Text,
 TradeGrid,
 TradeItemsContainer,
 TradeTitle
} from './styles';

interface TradeUser extends Partial<User> {
  available: boolean;
  offeringItems: Item[];
  ack: boolean;
}

export interface TradeScreenProps {
  sender: TradeUser, // you
  recipient: TradeUser // user that you'll be trading with
}

export default ({ recipient, sender }: TradeScreenProps) => {
  const {
    available: recipientAvailable,
    offeringItems: recipientItems,
    username: recipientName,
    ack: recipientAck
  } = recipient;
  const {
    offeringItems: senderItems
  } = sender;

  return (
    <TradeGrid>
      <TradeTitle>
        <Title>
          {recipientAvailable
              ? `Trading with: ${recipientName}`
              : `Waiting ${recipientName} to connect...`}
        </Title>
      </TradeTitle>
      <YourTrade>
        <Text>Your offer</Text>
        <TradeItemsContainer>
          {senderItems && senderItems.map((item) => <p>{item.name}</p>)}
        </TradeItemsContainer>

      </YourTrade>
      <OtherTrade>
        <Text>
          {recipientName}
          {' '}
          offer
        </Text>
        <TradeItemsContainer>
          {recipientItems && recipientItems.map((item) => <p>{item.name}</p>)}
        </TradeItemsContainer>

        {recipientAck && (
          <p>
            {recipientName}
            {' '}
            has accepted the trade
          </p>
        )}

      </OtherTrade>
      <ButtonContainer>
        <InventoryData>
          allow trade ?
        </InventoryData>
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
