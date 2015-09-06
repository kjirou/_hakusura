import AppStore from 'store/AppStore';


export function onTimer({ value, interval }) {
  const {dispatchers} = AppStore.getInstance();

  //if (gameStore.isPlaying()) {
  //  GameActionCreators.forwardGameTimeByFrame();
  //}

  //if (gameStore.didPlayerGetVictoryJustNow()) {
  //  if (gameStore.hasNextMaze()) {
  //    GameActionCreators.advanceToNextMaze();
  //  } else {
  //    GameActionCreators.saveVictory();
  //  }
  //} else if (gameStore.didPlayerGetDefeatJustNow()) {
  //  GameActionCreators.saveDefeat();
  //}
}
