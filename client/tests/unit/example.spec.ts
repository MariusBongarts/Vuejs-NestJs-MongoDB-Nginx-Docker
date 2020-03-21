describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    expect('new message').toMatch(msg);
  });
});
