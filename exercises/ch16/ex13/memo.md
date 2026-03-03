`
> node .\ch16\ex13\shell.js
> hello
Error: spawn hello ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:285:19)
    at onErrorNT (node:internal/child_process:483:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn hello',
  path: 'hello',
  spawnargs: []
}
> ls
Error: spawn ls ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:285:19)
    at onErrorNT (node:internal/child_process:483:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn ls',
  path: 'ls',
  spawnargs: []
}
`

### メモ
1行のコマンドラインを分解して再帰的に実行
ExecCmd（単コマンド）、RedirCmd（リダイレクト）、PipeCmd（パイプ）