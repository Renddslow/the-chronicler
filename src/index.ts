#!/usr/bin/node
import sade from 'sade';
import release from './release';

const prog = sade('the-chronicler').version(process.env.VERSION || '');

prog
  .command('release <version>')
  .option('-f, --filename', '', 'CHANGELOG.md')
  .option('-l, --linkPattern', '')
  .action(release);

prog.command('fix');

prog.parse(process.argv);
