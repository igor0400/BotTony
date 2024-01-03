import { isBotInited } from '../start/index.js';
import { botName } from '../../config.js';
import { bot } from '../bot/index.js';
import { sayHelloPlayer, sayByePlayer } from './other.service.js';

bot.on('playerJoined', (player) => {
  if (player?.username !== botName && isBotInited) {
    sayHelloPlayer(player?.username ?? '');
  }
});

bot.on('playerLeft', (player) => {
  if (player?.username !== botName && isBotInited) {
    sayByePlayer(player?.username ?? '');
  }
});
