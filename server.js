const express = require('express');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('./config/setup-dev-server');

const port = 3000;
const app = express();

const createRenderer = (bundle) =>
    vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    });
let renderer;

// you may want to serve static files with nginx or CDN in production
app.use('/public',  express.static(path.resolve(__dirname, './dist')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));
}

app.get(/^\/(about)?\/?$/, async (req, res) => {
    const context = {
        url: req.params['0'] || '/',
        state: {
            title: 'Vue SSR - complicating my life',
            users: []
        }
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (error) {
        if (error.code === 404) {
            return res.status(404).send('404 | Why I not choose Angular?');
        }
        return res.status(500).send('500 | May be is time to run into React?');
    }

    res.end(html);
});

// the endpoint for 'serverPrefetch' demonstration
app.get('/users', (req, res) => {
    res.json([{
            name: 'Erros',
            lastname: '100 %'
        }, {
            name: 'Problems',
            lastname: '200%'
        }, {
            name: 'Why',
            lastname: 'is so'
        }]
    );
});

app.listen(port, () => console.log(`Listening on: ${port}`));