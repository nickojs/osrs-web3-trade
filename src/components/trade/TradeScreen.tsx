import { TradeUser } from '../../context/SocketContext';
import { Item } from '../inventory/interfaces';
import {
  Button,
  ButtonContainer,
  Title,
  TradeGrid,
  TradeTitle
} from './styles';
import TradeSection from './TradeSection';

export interface TradeScreenProps {
  targetUser: TradeUser,
  currentUser: TradeUser,
  onDecline: () => void;
  onAccept: () => void;
  removeItem: (item: Item) => void;
}

export default ({
  targetUser,
  currentUser,
  onDecline,
  onAccept,
  removeItem
}: TradeScreenProps) => {
  const {
    username, trading, sendingItems: targetUserItems, acceptTrade: targetUserAck
  } = targetUser;
  const { sendingItems: currentUserItems, acceptTrade: currentUserAck } = currentUser;

  return (
    <TradeGrid>
      <TradeTitle>
        <Title>
          {trading?.isTrading
              ? `Trading with: ${username}`
              : 'Waiting user to connect...'}
        </Title>
      </TradeTitle>
      {Object.keys(currentUser).length > 0 && (
        <TradeSection
          type="current"
          title="Your Offer"
          items={currentUserItems}
          removeItemHandler={removeItem}
          ackMsg={currentUserAck ? 'You accept the trade' : ''}
        />
      )}
      {Object.keys(targetUser).length > 0 && (
        <TradeSection
          type="target"
          title={`${username} offer`}
          items={targetUserItems}
          ackMsg={targetUserAck ? `${username} accept the trade` : ''}
        />
      )}
      <ButtonContainer>
        <Button
          disabled={currentUserAck}
          onClick={onAccept}
          color="lime"
        >
          Accept
        </Button>
        <Button
          onClick={onDecline}
          color="red"
        >
          Decline
        </Button>
      </ButtonContainer>
    </TradeGrid>
  );
};
