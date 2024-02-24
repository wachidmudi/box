import { defineConfig } from 'vite';

import appendHeadScriptsAtBody from './plugins/append-head-script-to-body';

/**
 * The only way to make sure that functionality available in global window is to disable minify
 * @see https://github.com/vitejs/vite/discussions/5172
 * And remove `type="module"` attribute from build html
 */
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    {
      name: 'build-html',
      apply: 'build',
      transformIndexHtml: html => {
        let _html = html.replace('type="module" ', '');
        // _html = _html.replace('<script src="/src/main.ts"></script>', '');
        return {
          html: _html,
          tags: [
            // {
            //   tag: 'script',
            //   attrs: {
            //     src: '/assets/color-picker/colorPick.min.js',
            //   },
            //   injectTo: 'body',
            // },
          ],
        };
      },
    },
    appendHeadScriptsAtBody(),
  ],
});
