import * as helpers from '@/_server/_db/_helpers';

describe('helpers', () => {
  let originDb;
  beforeAll(async () => {
    originDb = process.env.MONGO_DB;
    process.env.MONGO_DB = 'finance-hd-test';
    const connection = await helpers.getConnection();
    const db = connection.db('finance-hd-test');
    await db.collection('users').deleteMany({});
    await db.collection('users').insertOne({
      _id: 'user_test',
      name: 'User Test',
    });
  });

  afterAll(() => {
    process.env.MONGO_DB = originDb;
  });

  test('find', async () => {
    const users = await helpers.find('users', {});
    expect(users).toHaveLength(1);
  });

  test('get', async () => {
    const user = await helpers.get('users', 'user_test');
    expect(user.name).toEqual('User Test');
  });

  test('insertOne', async () => {
    const data = {
      _id: 'user_test_2',
      name: 'User Test 2',
    };
    expect(await helpers.insertOne('users', data)).toBe(true);
  });

  test('updateOne', async () => {
    expect(await helpers.updateOne('users', 'user_test', { name: 'User Test 01' })).toBe(true);
  });

  test('deleteMany', async () => {
    expect(await helpers.deleteMany('users', { _id: 'user_test' })).toBe(true);
  });
});
