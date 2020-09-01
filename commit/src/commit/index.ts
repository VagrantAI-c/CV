import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { spawn } from 'child_process';
import { Observable, Subscriber } from 'rxjs';
import { Schema } from './schema';

export function commit(options: Schema): Rule {
    return () => {
        return chain([
            // Compile encode schematic
            executeCommand('tsc', ['-p', './encode-source/tsconfig.json']),

            // Execute encode schematic
            executeCommand('schematics', ['./encode-source:encode-source', '--dry-run=false', `--password=${options.password}`]),

            // Add all files to staged zone
            executeCommand('git', ['add', '.']),

            // Commit files
            executeCommand('git', ['commit', '-m', `"${options.commitMessage}"`]),

            // Compile decode schematic
            executeCommand('tsc', ['-p', './decode-source/tsconfig.json']),

            // Execute decode schematic
            executeCommand('schematics', ['./decode-source:decode-source', '--dry-run=false', `--password=${options.password}`]),
        ]);
    };
}

function executeCommand(command: string, args: string[] = []): Rule {
    return (host: Tree) => {
        return new Observable<Tree>((subscriber: Subscriber<Tree>) => {
            const child = spawn(command, args, {stdio: 'inherit', shell: true});
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
