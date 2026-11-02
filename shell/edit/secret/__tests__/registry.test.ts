import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { RadioGroup } from '@components/Form/Radio';
import { _CREATE } from '@shell/config/query-params';
import Registry from '@shell/edit/secret/registry.vue';

const mountRegistry = (registryUrl = '') => {
  const store = createStore({ getters: { 'i18n/t': () => (key: string) => `%${ key }%` } });
  const auths = registryUrl ? { [registryUrl]: {} } : {};

  return mount(Registry, {
    global: { plugins: [store] },
    props:  {
      value: { decodedData: { '.dockerconfigjson': JSON.stringify({ auths }) }, setData: jest.fn() },
      mode:  _CREATE,
    },
  });
};

describe('component: secret registry', () => {
  it('should translate the Custom option and keep its value', () => {
    const options = mountRegistry().findComponent(RadioGroup).props('options') as any[];

    expect(options).toContainEqual({ label: '%generic.custom%', value: 'Custom' });
  });

  it.each([
    ['my.registry.test', true],
    ['my.artifactory.test', true],
    ['index.docker.io/v1/', false],
  ])('given registry %p, should set needsDockerServer to %p', (registryUrl, expected) => {
    expect((mountRegistry(registryUrl).vm as any).needsDockerServer).toStrictEqual(expected);
  });
});
