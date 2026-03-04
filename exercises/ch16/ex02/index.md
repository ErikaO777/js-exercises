### Graceful Shutdown のために送信されるシグナル
Graceful Shutdownとは、システムやアプリケーションを停止する際現在の処理やタスクを可能な限り安全に終了して停止る一連の流れのこと。KubernetesやAmazon ECSが停止する際に送信されるシグナルはSIGTERM。

- Graceful Shutdownとは https://zenn.dev/loglass/articles/348886ded0f0bd
- Amazon ECS https://aws.amazon.com/jp/blogs/containers/graceful-shutdowns-with-ecs/