# OSRS Trade Simulator
This nostalgic-driven project replicates, to some extent, the experience of buying and trading OSRS Items. The UI is *totally* based on the game. The assets were fetched from the internet, mostly from the Runescape API/Wiki itself.

## Tell me more!
### **User creation**
Create a very simple user (username, password and a funny profile picture that you'll choose from an existing selection)
### **Search and get items**
This user will then be able to search from items at the Marketplace - it's kinda a GE, but free of charge. The selected items will be sent to the user's inventory.
### **User list**
There is a "userlist" feature, where the current user can find other users (it doesn't have an online/offline indicator yet) by their name and ask to trade. 

## Trade
It's implemented using websockets. Initially, a trade request is sent to the intended target user. If they accept, the tradescreen settles for both of them. It's possible now to select existing items from the inventory to trade. The items will be shown on both screens. After accepting the trade offer, the items are exchanged and the screen closes.

## Quick Example
![](https://github.com/nickojs/osrs-web3-trade/blob/main/src/assets/examples/basic.gif)

## Context/History 
Back in the day, I created a project named [S.N.I.](https://github.com/nickojs/zombie-survival-network) - It was a "social network" intended for a post-apocalyptic world, where the users could share their localization and items. At first, I didn't implement the item's trade logic, just the localization.

It was a challenge for some company, and they provided some boring icons for the items. When I start implementing the trade logic, I decided to use something cooler - a [Runescape Items API](https://www.osrsbox.com/). That project was abandoned and since I was using it as a core resource, my project got abandoned too. I was working pretty hard and didn't have the time to fix such a big flaw.

### The return
A month ago I was laid off and then I return to work on this project. A [brand new backend](https://github.com/nickojs/osrs-trade-backend) was developed, this time I'm integrating with the "official" Runescape API directly, plus all the websockets, users and items logic. 
