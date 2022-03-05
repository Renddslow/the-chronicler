import { Definition } from 'mdast';
import semver from 'semver';

const sortDefinitions = (a: Definition, b: Definition) => {
  if (semver.gt(a.identifier, b.identifier)) return -1;
  if (semver.gt(b.identifier, a.identifier)) return 1;
  return 0;
};

export default sortDefinitions;
