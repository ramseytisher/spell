module.exports = {
  siteMetadata: {
    title: `spelld.it`,
    description: `The worlds best spelling test app!`,
    author: `@ramseytisher`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `spelld.it`,
        short_name: `spelld.it`,
        start_url: `/`,
        background_color: `#1d6cd2`,
        theme_color: `#1d6cd2`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
