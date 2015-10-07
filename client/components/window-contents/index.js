import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';


export default {
  [WINDOW_CONTENT_TYPES.ADVENTURE]: require('./AdventureWindowContentComponent'),
  [WINDOW_CONTENT_TYPES.CHARACTER]: require('./CharacterWindowContentComponent'),
  [WINDOW_CONTENT_TYPES.INDEX]: require('./IndexWindowContentComponent'),
}
