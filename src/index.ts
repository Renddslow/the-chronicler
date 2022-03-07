#!/usr/bin/env node
import sade from 'sade';
import release from './release';

const prog = sade('the-chronicler')
  .describe(
    'A CLI for auto updating a [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) changelog for a given release.',
  )
  .version(process.env.VERSION || '');

prog
  .command('release <version>')
  .describe('Take the contents of the unreleased section and move it to a new release')
  .option('-f, --filename', '', 'CHANGELOG.md')
  .option('-l, --linkPattern', '')
  .action(release);

// prog.command('fix');

prog.parse(process.argv);
