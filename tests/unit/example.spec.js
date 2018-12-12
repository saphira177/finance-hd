import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';


describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $store: {
          getters: {
            loggedInUser: { name: 'Test User' },
          },
        },
      },
    });
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('v-flex-stub h1').text()).toMatch('Welcome Test User to Vuetify');
  });
});
