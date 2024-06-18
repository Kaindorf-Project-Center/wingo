/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    theme: {
        extend: {
            textColor: {
                "primary": "var(--theme-text-primary)",
                "secondary": "var(--theme-text-secondary)",
                "tertiary": "var(--theme-text-tertiary)",
                "quaternary": "var(--theme-text-quaternary)",
                "placeholder": "var(--theme-text-placeholder)",
                "link": "var(--theme-text-link)",
                "hint": "var(--theme-text-hint)",
            },
            backgroundColor: {
                // used for general backgrounds
                "primary": "var(--theme-background-primary)",
                "secondary": "var(--theme-background-secondary)",
                "tertiary": "var(--theme-background-tertiary)",
                "quaternary": "var(--theme-background-quaternary)",
                // used for the background of UI elements
                "fill-primary": "var(--theme-background-fill-primary)",
                "fill-secondary": "var(--theme-background-fill-secondary)",
                "fill-tertiary": "var(--theme-background-fill-tertiary)",
                "fill-quaternary": "var(--theme-background-fill-quaternary)",
                "fill-input-primary": "var(--theme-background-fill-input-primary)",
                "fill-input-secondary": "var(--theme-background-fill-input-secondary)",
            },
            colors: {
                "red-system": "var(--theme-red)",
                "orange-system": "var(--theme-orange)",
                "yellow-system": "var(--theme-yellow)",
                "green-system": "var(--theme-green)",
                "mint-system": "var(--theme-mint)",
                "teal-system": "var(--theme-teal)",
                "cyan-system": "var(--theme-cyan)",
                "blue-system": "var(--theme-blue)",
                "indigo-system": "var(--theme-indigo)",
                "purple-system": "var(--theme-purple)",
                "pink-system": "var(--theme-pink)",
                "brown-system": "var(--theme-brown)",
            }
        }
    }
}