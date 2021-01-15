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
    const message = await question("Commit message > ");

    execSync('npm run build');
    execSync('git add -A --');
    execSync('git commit --quiet -m"' + message + '"');
    execSync('git push');
    execSync('npm run publish');
})()