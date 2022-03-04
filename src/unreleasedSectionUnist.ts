import { u } from 'unist-builder';

const sections = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];

const unreleasedSectionUnist = [
  u(
    'heading',
    {
      depth: 2,
    },
    [
      u(
        'linkReference',
        {
          label: 'Unreleased',
          identifier: 'unreleased',
          referenceType: 'shortcut',
        },
        [u('text', 'Unreleased')],
      ),
    ],
  ),
  ...sections.map((v) =>
    u(
      'heading',
      {
        depth: 3,
      },
      [u('text', v)],
    ),
  ),
];

export default unreleasedSectionUnist;
