import path from 'path';

import conf from 'conf';
import AppEvent from 'containers/AppEvent';
import AppStore from 'containers/AppStore';
import AppInput from 'input/AppInput';


export function heading(filePath) {
  let relativePath = path.relative(conf.root, filePath);
  relativePath = relativePath.replace(/^test\//, '');
  relativePath = relativePath.replace(/\.(es6|js)$/, '');
  return relativePath;
}

export function clearApp() {
  return Promise.resolve()
    .then(() => {
      AppInput.clearInstance();
      AppStore.clearInstance();
      AppEvent.clearInstance();
    })
  ;
}
