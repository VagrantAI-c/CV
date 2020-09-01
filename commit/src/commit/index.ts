import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { spawn } from 'child_process';
import { Observable, Subscriber } from 'rxjs';
import { Schema } from './schema';

export function commit(options: Schema): Rule {
    return () => {
        return chain([
            executeCommand('npm.cmd', ['run', 'run:encode', `--password=${options.password}`]),
            executeCommand('git', ['add', '.']),
            executeCommand('git', ['commit', '-m', `"${options.commitMessage}"`]),
            executeCommand('npm', ['run', 'run:decode', `--password=${options.password}`]),
        ]);
    };
}

function executeCommand(command: string, args: string[] = []): Rule {
    return (host: Tree) => {
        return new Observable<Tree>((subscriber: Subscriber<Tree>) => {
            const child = spawn(command, args, {stdio: 'inherit'});
            child.on('error', error => {
                subscriber.error(error);
            });
            child.on('close', () => {
                subscriber.next(host);
                subscriber.complete();
            });

            return () => {
                child.kill();
            };
        });
    };
}
