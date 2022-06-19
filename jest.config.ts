export default {
    globals: {
        'ts-jest': {
            tsconfigFile: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testMatch: [
        '**/test/**/*.test.ts'
    ],
    testEnvironment: 'node'
};
