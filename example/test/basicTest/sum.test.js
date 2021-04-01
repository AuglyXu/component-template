/**
 * @file 测试代码
 * @author 徐贤喆
 * @date 2021/03/01
 */
const sum2 = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum2(1, 2)).toBe(3);
});
