import path from 'path';
import fs from 'fs/promises';
import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';
import kleur from 'kleur';
import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import remarkParse from 'remark-parse';

import catchify from './utils/catchify';
import releasePlugin from './releasePlugin';

type Opts = {
  filename?: string;
  linkPattern?: string;
};

const explorer = cosmiconfig('chronicler');

const release = async (version: string, opts: Opts) => {
  const [, foundConfig] = await catchify<CosmiconfigResult>(explorer.search(process.cwd()));

  const config = Object.assign({}, foundConfig ? foundConfig.config : {}, opts);

  if (!config.linkPattern) {
    console.error(
      kleur.red(
        `\t${kleur.bold(
          'link-pattern',
        )} must be provided either as a config parameter or CLI flag.`,
      ),
    );
    process.exit(1);
  }

  const filename = path.join(process.cwd(), config.filename || 'CHANGELOG.md');
  const changelog = (await fs.readFile(filename)).toString();

  const updatedChangelog = await unified()
    .use(remarkParse)
    .use(releasePlugin)
    // @ts-ignore
    .use(remarkStringify)
    .process(changelog);

  console.log(kleur.gray('Saving updated changelog...'));
  await fs.writeFile(
    path.join(process.cwd(), config.filename || 'CHANGELOG.md'),
    updatedChangelog.value,
  );
};

export default release;
