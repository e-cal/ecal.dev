/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./src/templates/**/*.{html,jinja}"],
    theme: {
        fontFamily: {
            "sans": ['"JetBrains Mono"'],
        },
        extend: {
            transitionDuration: {
                1500: "2000ms",
                2000: "2000ms",
            },
            colors: {
                ...colors,
                rosewater: "#f5e0dc",
                flamingo: "#f2cdcd",
                pink: "#f5c2e7",
                mauve: "#cba6f7",
                red: "#f38ba8",
                maroon: "#eba0ac",
                peach: "#fab387",
                yellow: "#f9e2af",
                green: "#a6e3a1",
                teal: "#94e2d5",
                sky: "#89dceb",
                sapphire: "#74c7ec",
                blue: "#89b4fa",
                lavender: "#b4befe",
                text: "#cdd6f4",
                subtext1: "#bac2de",
                subtext0: "#a6adc8",
                overlay2: "#9399b2",
                overlay1: "#7f849c",
                overlay0: "#6c7086",
                surface2: "#585b70",
                surface1: "#45475a",
                surface0: "#313244",
                base: "#1e1e2e",
                mantle: "#181825",
                crust: "#11111b",
                bg: "#111115",
                fg: "#DEE4F7",
            },
        },
    },
    plugins: [
        plugin(function({ addVariant }) {
            addVariant("htmx-settling", [
                "&.htmx-settling",
                ".htmx-settling &",
            ]);
            addVariant("htmx-request", ["&.htmx-request", ".htmx-request &"]);
            addVariant("htmx-swapping", [
                "&.htmx-swapping",
                ".htmx-swapping &",
            ]);
            addVariant("htmx-added", ["&.htmx-added", ".htmx-added &"]);
        }),
    ],
};
