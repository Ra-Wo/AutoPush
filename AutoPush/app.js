const express = require('express')
const exec = require('child_process').exec;
const app = express()
const port = 3232
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

let message, error;

function push() {
	readline.question("\033[1;33m╭─AutoPush\n╰─$ \033[0m", msg => {
		if (msg == ".auto")
		{
			push_to_github();
			setInterval(push_to_github, 3000);
		}
		console.log("\n");
		exec(`cd .. ; git add . ; git commit -m "${msg}" ; git push`,
			function (errorcmd, stdout, stderr) {
				if (stdout)
					console.log(stdout);
				if (stderr)
					console.log('\033[0;32m' + stderr + "\033[0m");
					error = stderr;
				if (errorcmd !== null)
					console.log('\033[1;31m exec error: ' + errorcmd + "\033[0m");
				push()
			});
			
	})
}

function push_to_github() {
	exec('clear; cd .. ; git add . ; git commit -m "update" ; git push',
		function (errorcmd, stdout, stderr) {
			if (stdout && message != stdout)
			{
				console.log(stdout);
				message = stdout;
			}
			if (stderr && error != stderr)
			{
				console.log('\033[0;32m' + stderr + "\033[0m");
				error = stderr;
			}
			if (errorcmd !== null)
				 console.log('\033[1;31m exec error: ' + errorcmd + "\033[0m");
		}
	);
}

function clear() {
	exec(`clear`,
		function (errorcmd, stdout, stderr) {
			if (stdout)
				console.log(stdout);
			if (stderr)
				console.log('\033[0;32m' + stderr + "\033[0m");
				error = stderr;
			if (errorcmd !== null)
				console.log('\033[1;31m exec error: ' + errorcmd + "\033[0m");
			push()
		}
	);
}

app.listen(port, (err) => {
	if (err) console.log(err)
	console.log("\033[0;32m Starting...\n\033[0m")
	clear();
	push();
})