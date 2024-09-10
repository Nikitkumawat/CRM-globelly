import { defineConfig } from 'orval';

// https://orval.dev/reference/configuration/input
// https://prototyp.digital/blog/generating-api-client-openapi-swagger-definitions
export default defineConfig( {
    auth: {
        input: './spec/auth.yml',
        output: {
            mode: 'tags-split',
            client: 'react-query',
            httpClient: 'axios',
            mock: true,
            prettier: true,
            target: './src/api/auth/client.ts',
            schemas: './src/api/auth/model',
            baseUrl: '/api/auth',
            override: {
                query:{
                    useSuspenseQuery: true,
                    // useSuspenseInfiniteQuery: true,     // Until https://github.com/orval-labs/orval/issues/1597 is fixed
                    // useInfinite: true,
                },
                components: {
                    schemas: {
                        suffix: 'DTO'
                    },
                    responses: {
                        suffix: 'Response',
                    },
                    parameters: {
                        suffix: 'Params',
                    },
                    requestBodies: {
                        suffix: 'Bodies',
                    },
                },
            }
        },
    },
    authZod: {
        input: './spec/auth.yml',
        output: {
            mode: 'tags-split',
            client: 'zod',
            prettier: true,
            target: './src/api/auth/client.ts',
            fileExtension: '.zod.ts',
        },
    },
    portfolio: {
        input: './spec/portfolio.yml',
        output: {
            mode: 'split',
            client: 'react-query',
            httpClient: 'axios',
            mock: true,
            prettier: true,
            clean: true,
            target: './src/api/portfolio/client.ts',
            schemas: './src/api/portfolio/model',
            baseUrl: '/api/portfolio',
            override: {
                query:{
                    useSuspenseQuery: true,
                },
                components: {
                    schemas: {
                        suffix: 'DTO'
                    },
                    responses: {
                        suffix: 'Response',
                    },
                    parameters: {
                        suffix: 'Params',
                    },
                    requestBodies: {
                        suffix: 'Bodies',
                    },
                },
            }
        },
    },
    experiment: {
        input: './spec/experiment.yml',
        output: {
            mode: 'split',
            client: 'react-query',
            httpClient: 'axios',
            mock: true,
            prettier: true,
            clean: true,
            target: './src/api/experiment/client.ts',
            schemas: './src/api/experiment/model',
            baseUrl: '/api/experiment',
            override: {
                query:{
                    useSuspenseQuery: true,
                },
                components: {
                    schemas: {
                        suffix: 'DTO'
                    },
                    responses: {
                        suffix: 'Response',
                    },
                    parameters: {
                        suffix: 'Params',
                    },
                    requestBodies: {
                        suffix: 'Bodies',
                    },
                },
            }
        },
    },
})