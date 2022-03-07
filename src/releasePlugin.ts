import semver from 'semver';
import { Root } from 'remark-parse/lib';
import { LinkReference, PhrasingContent, Definition, Content } from 'mdast';

import getNextVersionFromKeyword from './getNextVersionFromKeyword';
import unreleasedSectionUnist from './unreleasedSectionUnist';
import makeVersionSection from './makeVersionSection';
import { klona } from 'klona';
import addDefinition from './addDefinition';
import sortDefinitions from './sortDefinitions';

type Increment = 'major' | 'minor' | 'patch';

type Settings = {
  linkPattern: string;
  version: Increment | string;
};

function releasePlugin(settings: Settings) {
  return (tree: Root) => {
    const baseVersion = settings.version.replace(/^v/, '');
    const version = semver.valid(baseVersion)
      ? baseVersion
      : getNextVersionFromKeyword(tree, baseVersion as Increment);

    const unreleasedStartIdx = tree.children.findIndex((node) => {
      return (
        node.type === 'heading' &&
        node.depth === 2 &&
        node.children.some(
          (c: LinkReference | PhrasingContent) =>
            c.type === 'linkReference' && (c.label || '').includes('Unreleased'),
        )
      );
    });

    const unreleasedEndIdx = tree.children
      .slice(unreleasedStartIdx + 1)
      .findIndex(
        (node) => (node.type === 'heading' && node.depth === 2) || node.type === 'definition',
      );

    const definitionsStartIdx = tree.children.findIndex((node) => node.type === 'definition');

    const unreleasedSection = tree.children.slice(
      unreleasedStartIdx,
      unreleasedEndIdx + unreleasedStartIdx + 1,
    );

    const filteredList = unreleasedSection.filter((node, idx) => {
      if (node.type !== 'heading') return true;
      return (
        node.depth === 3 &&
        idx + 1 < unreleasedSection.length &&
        unreleasedSection[idx + 1].type !== 'heading'
      );
    });

    if (filteredList.length < 1) {
      process.exit(0);
    }

    const currentDefinitions = (tree.children.slice(definitionsStartIdx) as Definition[])
      .filter((d: Definition) => d.identifier !== 'unreleased')
      .sort(sortDefinitions);

    const definitions = [
      addDefinition('HEAD', version, settings.linkPattern, true),
      addDefinition(version, currentDefinitions[0].identifier, settings.linkPattern),
      ...currentDefinitions,
    ];

    // @ts-ignore
    tree.children = [
      ...tree.children.slice(0, unreleasedStartIdx),
      ...unreleasedSectionUnist,
      makeVersionSection(version),
      ...filteredList,
      ...tree.children.slice(unreleasedEndIdx + unreleasedStartIdx + 1, definitionsStartIdx),
      ...definitions,
    ];

    // console.log(tree);
  };
}

export default releasePlugin;
