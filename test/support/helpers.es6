import path from 'path';

import conf from 'conf';
import AppInput from 'input/AppInput';
import AppStore from 'store/AppStore';


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
    })
  ;
}