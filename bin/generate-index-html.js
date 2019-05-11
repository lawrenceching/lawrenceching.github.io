const fse = require('fs-extra');
const path = require('path');

(async function generateIndexHtml() {

    const files = await fse.readdir('src');
    const mdFiles = files.filter(file => file !== '.' && file !== '..')
        .filter(file => fse.statSync(`src/${file}`).isFile())
        .filter(file => file.endsWith('.md'));

    const promises = [];
    mdFiles.forEach(file => {

        const path = `src/${file}`;
        promises.push(fse.readFile(path, 'utf8')
            .then(content => {
                return content.split('\n')[0]
            })
            .then(firstLine => {
                return firstLine.replace(/#/g, '').trim();
            })
            .then(title => {
                return {
                    title,
                    markdownFile: file,
                    htmlFile: file.replace('md', 'html'),
                }
            }));

    });

    const titles = await Promise.all(promises);
    const artiles = titles.map(article => `
    <article class="post" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">
                        <div class="meta">
                            <div class="date">
                                <time datetime="2018-11-06T22:13:35+08:00" itemprop="datePublished">2018/11/6</time>
                            </div>



                        </div>
                        <h1 class="title" itemprop="name"><a href="${article.htmlFile}" itemprop="url">${article.title}</a></h1>
                    </article>
    `)
        .join('\n');


    const template = await fse.readFile('bin/index.template.html', 'utf8');
    const content = template.replace('<!-- ARTICLES -->', artiles);

    return fse.writeFile('index.html', content, 'utf8');
})();