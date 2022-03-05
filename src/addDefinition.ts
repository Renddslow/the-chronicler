import templite from 'templite';
import { u } from 'unist-builder';

const addDefinition = (
  version: string,
  prevVersion: string,
  linkPreview: string,
  unreleased?: boolean,
) => {
  const link = templite(linkPreview, {
    prev: prevVersion,
    next: version,
  });

  return u('definition', {
    identifier: unreleased ? 'unreleased' : version,
    label: unreleased ? 'Unreleased' : version,
    title: null,
    url: link,
  });
};

export default addDefinition;
