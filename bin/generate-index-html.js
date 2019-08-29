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
        var stats = fse.statSync(path);
        var mtime = stats.mtime;

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
                    lastModifiedTime: mtime
                }
            }));

    });


    const titles = await Promise.all(promises);
    const artiles = titles.map(article => {
        const lastModifiedTime = article.lastModifiedTime;
        const datePublished = `${lastModifiedTime.getFullYear()}/${lastModifiedTime.getMonth()}/${lastModifiedTime.getDay()}`
        return `
    <article class="post" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">
                        <div class="meta">
                            <div class="date">
                                <time datetime="${lastModifiedTime.toISOString()}" itemprop="datePublished">${datePublished}</time>
                            </div>



                        </div>
                        <h1 class="title" itemprop="name"><a href="${article.htmlFile}" itemprop="url">${article.title}</a></h1>
                    </article>
    `
    })
        .join('\n');


    const template = await fse.readFile('bin/index.template.html', 'utf8');
    const content = template.replace('<!-- ARTICLES -->', artiles);

    return fse.writeFile('index.html', content, 'utf8');
})();