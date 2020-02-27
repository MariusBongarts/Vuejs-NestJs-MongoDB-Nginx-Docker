import { shallowMount } from '@vue/test-utils';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    expect('new message').toMatch(msg);
  });
});
