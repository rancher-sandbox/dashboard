import Pod from '@shell/models/pod';
import { WORKLOAD_TYPES } from '@shell/config/types';

describe('class: Pod', () => {
  const makePod = () => new Pod({
    metadata: { name: 'test', namespace: 'default' },
    links:    { view: 'view-link' },
    spec:     { nodeName: 'node-1' },
    status:   { phase: 'Running', podIP: '10.0.0.1' },
  }, {
    getters:     {},
    dispatch:    jest.fn(),
    rootGetters: { 'i18n/t': (key: string) => `%${ key }%` },
  });

  it('should translate the shell menu item', () => {
    expect(makePod().openShellMenuItem.label).toStrictEqual('%action.openShell%');
  });

  it('should translate the logs menu item', () => {
    expect(makePod().openLogsMenuItem.label).toStrictEqual('%action.openLogs%');
  });

  it('should translate the labels in details', () => {
    const pod = makePod();

    Object.defineProperty(pod, 'workloadRef', {
      get: () => ({
        name: 'owner', type: WORKLOAD_TYPES.DEPLOYMENT, namespace: 'default'
      })
    });

    expect(pod.details.map((d: any) => d.label)).toStrictEqual([
      '%workload.detailTop.podIP%',
      '%workload.detailTop.workload%',
      '%workload.detailTop.node%',
    ]);
  });
});
