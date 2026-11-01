import { shallowMount } from '@vue/test-utils';
import ProgressBarMulti from '@shell/components/ProgressBarMulti.vue';
import { stringFor } from '@shell/plugins/i18n';
import { getters, state } from '@shell/store/i18n';

// Jest cannot import YAML, so parse the real file: a wrong key or a broken ICU message must fail here.
jest.mock('@shell/assets/translations/en-us.yaml', () => {
  const { readFileSync } = jest.requireActual('fs');
  const { resolve } = jest.requireActual('path');
  const { load } = jest.requireActual('js-yaml');

  return load(readFileSync(resolve(__dirname, '../../assets/translations/en-us.yaml'), 'utf8'));
});

describe('component: ProgressBarMulti', () => {
  const store = { getters: { 'i18n/t': getters.t({ ...state(), selected: 'en-us' }) } };
  const t = (key: string, args: object, raw: boolean) => stringFor(store, key, args, raw);
  const mountBar = (values: object[]) => shallowMount(ProgressBarMulti, {
    props:  { values },
    global: { mocks: { t } },
  });

  it.each([
    [1, '1 item Fish & Chips'],
    [2, '2 items Fish & Chips'],
    [1234, '1,234 items Fish & Chips'],
  ])('should build the unescaped aria label for a count of %d', (value, expected) => {
    const wrapper = mountBar([{ value, label: 'Fish & Chips' }]);

    expect(wrapper.attributes('aria-label')).toStrictEqual(expected);
  });

  it('should have an empty aria label for no values', () => {
    expect(mountBar([]).attributes('aria-label')).toStrictEqual('');
  });
});
