# cb-system

  the `system()` you've *actually* missed

## Installation

    npm install cb-system

## API
### system(command)
### system(command, args)
### system(command, opts)
### system(command, args, opts)

  Uses `child_process.spawn` to spawn the process, and waits for it to exit.
  If everything goes okay, callback is called with no arguments.
  If the process exits abnormally, the callback is called with an error.

  For clarity, command is allowed to be an array, for cases like `vmadm boot`, where `vmadm` clearly isn't a very useful description of what command is being run.
  This only makes a difference for error reporting.

#### ExitError

  * name: `ExitError`
  * stderr: stderr output of the process (Buffer)

  then, depending on how it exited:

  * signal: signal that killed the process (string)
  * message: ``'`' + command + '` killed by signal `' + err.signal + '`: ' + err.stderr``

  *or*

  * code: exit code (integer)
  * message: ``'`' command + '` exited with ' + err.code + ': ' + err.stderr``

## Acknowledgements
This is literally a fork of [`then-system`](https://github.com/nathan7/then-system)
reworked to use callbacks. Whole refactor wound up being about 6 lines shorter.

Another fun fact: the total size of this module (including dependencies)
with promises was 4084 lines of code, and is now reduced to 3213 lines of code.
