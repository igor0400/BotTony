import { bot } from '../bot/index.js';
import { stopFightOnPlayerDead } from './fight.service.js';

bot.on('entityDead', stopFightOnPlayerDead);
