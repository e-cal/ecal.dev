module.exports = {
    siteMetadata: {
        title: "ecal.dev",
    },
    plugins: [
        // mdx
        "gatsby-plugin-mdx",
        // Sass and tailwind
        {
            resolve: "gatsby-plugin-sass",
            options: {
                postCssPlugins: [
                    require("tailwindcss"),
                    require("./tailwind.config.js"),
                ],
            },
        },
        // Filesystem
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
    ],
};
