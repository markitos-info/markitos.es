module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    cacheDirectory: '/tmp/jestCache',
    collectCoverage: false,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/src/**/*.d.ts',
        '!<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/index.ts',
        '/src/index.tsx'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    setupFilesAfterEnv: [
        '<rootDir>/test/setup.ts'
    ],
    testMatch: [
        '<rootDir>/test/**/*.test.{js,jsx,ts,tsx}'
    ]
};
