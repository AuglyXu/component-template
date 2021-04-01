module.exports = {
    bail: true,
    verbose: true,
    displayName: 'TEST',
    cacheDirectory: '/example/test/__tmp__', // 缓存文件目录结构到/example/test/__tmp__
    globals: {
        __DEV__: true, // 配置全局变量, 可通过__DEV__直接访问到测试的全局变量
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    transform: {
        // 将.js后缀的文件使用babel-jest处理
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '.+\\.(css|less|scss)$': 'jest-transform-css',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    collectCoverage: true,
    collectCoverageFrom: [
        '/example/test/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageDirectory: '<rootDir>/example/testInternals/analyze/',
    moduleDirectories: ['node_modules', 'example'], // 默认从node_modules里面找模块, 然后从example里找模块
    // 例如: require("./a.png")会被解析成 require("<rootDir>/example/test/__staticFiles__/fileMock.js")
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/example/test/__mock__/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/example/test/__mock__/styleMock.js',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    snapshotSerializers: ['enzyme-to-json/serializer'], // 快照映射格式修改
    setupFiles: ['<rootDir>/example/testInternals/enzymeTest.js'], // 测试之前需要做什么
    setupFilesAfterEnv: ['<rootDir>/example/testInternals/preTest.js'], // 在setupFiles后会执行
};
