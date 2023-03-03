module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'karma-typescript'],
        files: [
            'src/**/*.ts',
            'tests/**/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            "**/*.ts": ['karma-typescript']
        },
        karmaTypescriptConfig: {
            tsconfig: './tsconfig-cjs.json'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity
    })
}