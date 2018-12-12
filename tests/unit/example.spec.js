// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';


describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $localStorage: {
          get: jest.fn().mockReturnValue('dungla4'),
        },
      },
    });
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('v-flex-stub h1').text()).toMatch('Welcome dungla4 to Vuetify');
  });
});
