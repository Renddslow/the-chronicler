import { Node } from 'unified/lib';
import { visit } from 'unist-util-visit';
import semver from 'semver';

const getNextVersionFromKeyword = (tree: Node, keyword: 'major' | 'minor' | 'patch'): string => {
  const versions: string[] = [];

  visit(tree, 'definition', (node: { label: string }) => {
    if (node.label !== 'Unreleased') {
      versions.push(node.label);
    }
  });

  const sortedVersions = versions.sort((a, b) => {
    if (semver.gt(a, b)) return -1;
    if (semver.gt(b, a)) return 1;
    return 0;
  });

  const currentVersion = sortedVersions.length ? sortedVersions[0] : '0.0.0';

  return semver.inc(currentVersion, keyword) || '';
};

export default getNextVersionFromKeyword;
