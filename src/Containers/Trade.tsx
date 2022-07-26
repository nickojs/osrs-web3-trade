import TradeScreen from '../components/trade/TradeScreen';
import useSocket from '../context/SocketContext';

export default () => {
  const {
    targetUser, currentUser, tradeScreen, declineTrade, removeItem, acknowledgeTrade
  } = useSocket();

  return (
    <div>
      {tradeScreen && (
        <TradeScreen
          targetUser={targetUser}
          currentUser={currentUser}
          onDecline={declineTrade}
          onAccept={acknowledgeTrade}
          removeItem={removeItem}
        />
      )}
    </div>
  );
};
