import Node, { listNodeRoles } from '@shell/models/cluster/node';

describe('class Node', () => {
  const resetMocks = () => {
    // Clear all mock function calls:
    jest.clearAllMocks();
  };

  it.each([
    ['1200', 1200],
    ['1k', 1000]
  ])('given %p status pod capacity value from the backend, should parse the value correctly as %p', (value, result) => {
    const node = new Node({ status: { capacity: { pods: value } } });

    expect(node.podCapacity).toStrictEqual(result);
    resetMocks();
  });
});

describe('fx: listNodeRoles', () => {
  const t = (key: string) => `%${ key }%`;
  const controlPlane = '%model.machine.role.controlPlane%';
  const worker = '%model.machine.role.worker%';
  const etcd = '%model.machine.role.etcd%';

  it.each([
    [[true, false, false], controlPlane],
    [[false, true, false], worker],
    [[false, false, true], etcd],
    [[true, false, true], `${ controlPlane }, ${ etcd }`],
    [[false, true, true], `${ worker }, ${ etcd }`],
    [[false, false, false], '%generic.all%'],
    [[true, true, true], '%generic.all%'],
  ])('given roles %p, should return %p', ([isControlPlane, isWorker, isEtcd], expected) => {
    expect(listNodeRoles(isControlPlane, isWorker, isEtcd, t)).toStrictEqual(expected);
  });
});
