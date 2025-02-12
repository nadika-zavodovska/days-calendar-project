module.exports = {
    transform: {
        '^.+\\.mjs$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testMatch: ['**/tests/**/*.test.mjs'],
};
