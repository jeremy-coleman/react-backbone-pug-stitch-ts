for whatever reason, u gotta edit the styled component for it to show up correctly. once it re-renders, it shows fine
gives an error about unexepcted h4 in a div element


i suspect its from..
```ts
      [moduleName]: (props: any = {}) => {
        if (mode === modes.SERVER) {
          const mountId = props.mountId || uniqueId('stitch-component-')
          const sheet = new ServerStyleSheet()
          const html = renderToString(
            sheet.collectStyles(<Component {...props} />)
          )
          const css = sheet.getStyleTags()
          const markup = `
            <div id="${mountId}">
              ${css}
              ${html}
            </div>
          `.trim()
```

maybe fixes:

1
just attach styles to react-dataroot.

2
pre-render to actual css.

3
use something better than this shit


maybe problems
where the ${css} is inserterd 