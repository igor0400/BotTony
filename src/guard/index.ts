// команды guard и unguard
// сделать типы охраны (дом, человек и тд)
// по дефолту охранять дом, me - охранять овнера

// function guardArea(pos) {
//   setHomePos(pos.clone());

//   if (!bot.pvp.target) {
//     moveToPos(homePos);
//   }
// }

// function stopGuarding() {
//   bot.pvp.stop();
//   bot.pathfinder.setGoal(null);
//   if (homePos) {
//     moveToPos(homePos);
//   }
// }

// // атаковать ближайших мобов

// bot.on('physicsTick', () => {
//    if (!guarding) return;

//    const filter = (e) =>
//       e.type === 'mob' &&
//       e.position.distanceTo(bot.entity.position) < 8 &&
//       attacksMobs.includes(e.displayName);
//    const entity = bot.nearestEntity(filter);
//    attackEntity(entity);
// });

// // охрана дома

// function trueGuarding() {
//    guarding = true;
//    bot.chat('Теперь я охраняю точку дома');
// }

// function falseGuarding() {
//    guarding = false;
//    bot.chat('Я больше не охраняю точку дома');
// }
