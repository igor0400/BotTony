// function attackEntity(entity) {
//   if (entity) {
//     const sword = bot.inventory.items().find((item) => item.name.includes('sword'));
//     if (sword) bot.equip(sword, 'hand');
//     bot.pvp.attack(entity);
//   }
// }

// // остановка атаку

// bot.on('stoppedAttacking', () => {
//   if (homePos && !activeFollow && !collecting) {
//     moveToPos(homePos);
//     return;
//   }

//   if (activeFollow) {
//     followPlayer(activeFollow);
//   }

//   if (collecting) {
//     bot.chat(`Не у далось дособирать ${collecting}, мне помешал монстр`);
//     collecting = false;
//     moveToPos(homePos);
//   }
// });
