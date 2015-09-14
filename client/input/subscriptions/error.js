import chalk from 'chalk';

import AppStore from 'containers/AppStore';


export function onError(err) {
  console.error(chalk.red(err.stack));
}
