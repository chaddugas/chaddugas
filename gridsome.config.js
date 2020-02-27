const path = require('path')
const ImageminPlugin = require("imagemin-webpack");

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({patterns: [path.resolve(__dirname, './src/assets/scss/*.scss')]})
}

module.exports = {
	siteName: 'Chad Dugas • Portfolio',
	titleTemplate: `Chad Dugas • Portfolio`,
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
        path: 'static/data/about.json',
        typeName: 'About'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/projects.json',
        typeName: 'Projects'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/contact.json',
        typeName: 'contact'
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
	],
	
	css: {
		loaderOptions: {
			postcss: {
				plugins: [require('autoprefixer')({ grid: true })]
			}
		}
	},

  chainWebpack: (config) => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
		
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
			.loader('pug-plain-loader')

		config.module
			.rule('postcss-loader')
			.test(/\.css$/)
			.use(["autoprefixer"])
			.loader('postcss-loader')
  }
}