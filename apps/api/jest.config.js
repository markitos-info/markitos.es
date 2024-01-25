module.exports = {
    preset: 'ts-jest',
    reporters: ['default',  'jest-sonar'],
    testEnvironment: 'node',
    cacheDirectory: '/tmp/jestCache',
    collectCoverage: true,
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
    testMatch: [
        '<rootDir>/test/**/*.test.{js,jsx,ts,tsx}'
    ]
};
