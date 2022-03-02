const catchify = <T>(fn): Promise<[unknown | null, T | null]> =>
  Promise.resolve(fn).then(
    (data) => [null, data],
    (err) => [err, null],
  );

export default catchify;
