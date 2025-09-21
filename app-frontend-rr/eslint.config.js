import pluginQuery from '@tanstack/eslint-plugin-query'
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    ...pluginQuery.configs['flat/recommended'],
    reactHooks.configs['recommended-latest']
    // Any other config...
]