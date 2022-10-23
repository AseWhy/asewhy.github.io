

const { execSync } = require("child_process")
    ,   readline = require("readline");

let question;

{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    question = (message) => {
        return new Promise(res => {
            rl.question(message, (responce) => {
                res(responce);
            });
        });
    };
}

(async () => {
    const start = Date.now();
    const message = await question("Commit message > ");

    console.log('Building changes...');
    execSync('npm run build');

    console.log('Applying changes...');
    execSync('git add -A --');

    console.log('Commiting changes...');
    execSync('git commit --quiet -m"' + message + '"');

    console.log('Pushing changes...');
    execSync('git push');

    console.log('Publishing changes...');
    execSync('npm run publish');

    console.log('Done: ' + (Date.now() - start) + ' ms.');
})()