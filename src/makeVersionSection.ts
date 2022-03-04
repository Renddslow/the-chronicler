import { u } from 'unist-builder';

const makeVersionSection = (version: string) => {
  const [date] = new Date().toISOString().split('T');
  return u(
    'heading',
    {
      depth: 2,
    },
    [
      u(
        'linkReference',
        {
          label: version,
          identifier: version,
          referenceType: 'shortcut',
        },
        [u('text', version)],
      ),
      u('text', ` - ${date}`),
    ],
  );
};

export default makeVersionSection;
