module.exports = {
  siteName: 'Chad Dugas Portfolio',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/main-nav/**/*.md',
        typeName: 'MainNav'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/main-banner/**/*.md',
        typeName: 'MainBanner'
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
	],
	
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
  }
}