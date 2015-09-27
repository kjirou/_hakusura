export default function serializeActions(store) {
  return next => {
    return action => {
      let actions = action;
      if (!Array.isArray(actions)) {
        actions = [actions];
      }
      actions.forEach(next);
    };
  }
}
