/**
 * @see https://github.com/pkfan/vite-append-head-scripts-at-body-plugin
 */
function appendHeadScriptsAtBody() {
  return {
    name: 'append-head-scripts-at-body',

    transformIndexHtml(html, ctx) {
      const replaceScriptFromHead = htmlHead => {
        let script = '';
        const regExpForScriptTagsSelection = new RegExp(
          '<script[^<>]+[^<>]+></script>'
        );

        let htmlHeadResult = htmlHead.replace(
          regExpForScriptTagsSelection,
          match => {
            script = `\n\t\t${match}`;
            return '';
          }
        );
        return { script, htmlHeadResult };
      };

      const replaceAllScriptFromHead = htmlHead => {
        let scripts = '';
        let htmlFinalHead = htmlHead;
        while (true) {
          let { script, htmlHeadResult } = replaceScriptFromHead(htmlFinalHead);

          if (!(script && script.trim() != '')) {
            break;
          }

          htmlFinalHead = htmlHeadResult;
          scripts = scripts + script;
        }

        return { scripts, htmlFinalHead };
      };

      const extractHeadTagsFromHtml = htmlInput => {
        const regExpForHeadTagsSelection = new RegExp('<head>(.|\n)*?</head>');

        let htmlHead = '';

        let htmlResultWithBodyTagsOnly = htmlInput.replace(
          regExpForHeadTagsSelection,
          match => {
            htmlHead = match;
            return '';
          }
        );

        return { htmlHead, htmlResultWithBodyTagsOnly };
      };

      const htmlTagStartingLength = htmlResultWithBodyTagsOnly => {
        // e.g [ ( <html lang="en"> ) of length 17 ] and [ ( <html> ) of length 6 ]
        const htmlStartTag = new RegExp('<html(.|\n)*?>').exec(
          htmlResultWithBodyTagsOnly
        )[0];
        const indexOfHtmlstartingTag =
          htmlResultWithBodyTagsOnly.indexOf(htmlStartTag);

        return htmlStartTag.length + indexOfHtmlstartingTag;
      };

      const concatHeadIntoHtml = ({
        htmlFinalHead,
        htmlResultWithBodyTagsOnly,
      }) => {
        const htmlStartTagLength = htmlTagStartingLength(
          htmlResultWithBodyTagsOnly
        );
        const startSlice = htmlResultWithBodyTagsOnly.slice(
          0,
          htmlStartTagLength
        );
        const endSlice = htmlResultWithBodyTagsOnly.slice(htmlStartTagLength);
        return `${startSlice}\n${htmlFinalHead}\n${endSlice}`;
      };

      const appendScriptsIntoHtmlEndBodyTag = ({ htmlResult, scripts }) =>
        htmlResult.replace('</body>', `\t\t${scripts}\n\t</body>`);

      if (ctx.chunk.isEntry) {
        let { htmlHead, htmlResultWithBodyTagsOnly } =
          extractHeadTagsFromHtml(html);

        const { scripts, htmlFinalHead } = replaceAllScriptFromHead(htmlHead);
        const htmlResult = concatHeadIntoHtml({
          htmlFinalHead,
          htmlResultWithBodyTagsOnly,
        });

        html = appendScriptsIntoHtmlEndBodyTag({ htmlResult, scripts });
      }

      return html;
    },
  };
}

export default appendHeadScriptsAtBody;
