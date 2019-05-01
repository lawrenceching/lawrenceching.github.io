"use strict";

const showdown = require('showdown');
const converter = new showdown.Converter();
const fse = require('fs-extra');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Path = require('path');




(async function generate() {

    const template = await fse.readFile('bin/template.html', 'utf8')

    const files = await fse.readdir('src');

    const mdFiles = files.filter(file => file !== '.' && file !== '..')
        .filter(file => fse.statSync(`src/${file}`).isFile())
        .filter(file => file.endsWith('.md'));

    console.log(`Detected markdown files: ${JSON.stringify(mdFiles, null, 4)}`);

    mdFiles.forEach(file => {

        const basename = Path.basename(file, '.md');

        const path = `src/${file}`;
        fse.readFile(path, 'utf8')
            .then(content => {
                console.log('Read content: ' + content);
                return converter.makeHtml(content)
            })
            .then(html => {
                const dom = new JSDOM(html);
                const title = dom.window.document.querySelector('h1').textContent
                console.log('Generate HTML: ' + html);
                const target = `${basename}.html`;

                const content = template.replace('<!-- CONTENT -->', html)
                    .replace('<!-- TITLE -->', title);

                return fse.writeFile(target, content, 'utf8');
            });

    })
})();