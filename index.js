'use strict';
var spawn = require('child_process').spawn
  , bl = require('bl')
  , exitError = require('exit-error')

module.exports =
function os(bin, args, opts, cb) {
  cb = cb || opts || args
  if (!Array.isArray(args)) {
    opts = args
    args = []
  }

  var name = bin
  if (Array.isArray(bin)) {
    name = bin.join(' ')
    args = bin.concat(args)
    bin = args.shift()
  }

  opts = opts
    ? Object.create(opts)
    : {}
  opts.stdio = [process.stdin, process.stdout, 'pipe']

  var child = spawn(bin, args, opts)
    , stderr

  if (!opts.quiet) child.stderr.pipe(process.stderr)

  child.stderr.pipe(bl(function (err, data) {
    stderr = data
  }))

  child.on('error', cb)
  child.on('close', function(code, signal) {
    if (code === 0 && !signal) return cb()
    var err = exitError(name, code, signal)
    err.message += ': ' + stderr
    err.stderr = stderr
    cb(err)
  })
}
