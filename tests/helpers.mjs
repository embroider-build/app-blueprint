import { sync as resolveBinSync } from 'resolve-bin';

function findEmber() {
  return resolveBinSync('ember-cli', { executable: 'ember' });
}

export const emberCli = findEmber();
