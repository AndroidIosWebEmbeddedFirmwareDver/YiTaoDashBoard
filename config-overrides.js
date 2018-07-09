const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    // do stuff with the webpack config...

    //按需加载组件代码和样式
    // config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);

    //自定义主题

    //引入ES6 antd
    config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);
    //引入ES6 react-native-storage
    // config = injectBabelPlugin(['import', {libraryName: 'react-native-storage',style: true}], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: {"@primary-color": "#1DA57A"},
        // modifyVars: {"@primary-color": "#FEBFC0"},
    })(config, env);

    return config;
};

