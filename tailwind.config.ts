import type {Config} from 'tailwindcss'

const config: Config = {
    darkMode: 'selector', // No dark mode for now https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter, sans-serif', {fontFeatureSettings: '"cv11"'}],
            },
        },
    },
    plugins: [],
}
export default config