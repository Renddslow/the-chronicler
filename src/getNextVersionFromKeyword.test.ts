import test from 'ava';
import { u } from 'unist-builder';

import getNextVersionFromKeyword from './getNextVersionFromKeyword';

test('getNextVersionFromKeyword - returns string', (t) => {
  t.is(typeof getNextVersionFromKeyword(u('root'), 'major'), 'string');
});

test('getNextVersionFromKeyword - returns 0.1.0 when no definitions are present and keyword is minor', (t) => {
  t.is(getNextVersionFromKeyword(u('root'), 'minor'), '0.1.0');
});

test('getNextVersionFromKeyword - returns 0.2.0 when definitions highest version is 0.1.0 and keyword is minor', (t) => {
  t.is(
    getNextVersionFromKeyword(
      u('root', [
        u('definition', {
          label: 'Unreleased',
        }),
        u('definition', {
          label: '0.1.0',
        }),
        u('definition', {
          label: '0.0.0',
        }),
      ]),
      'minor',
    ),
    '0.2.0',
  );
});
