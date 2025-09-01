// 目覚まし時計の状態
export const State = Object.freeze({
  NORMAL: Symbol("normal"), // 通常
  ALARM_SET: Symbol("alarmSet"), // アラームセット中
  ALARM_SOUNDING: Symbol("alarmSounding"), // アラーム鳴動中
  SNOOZING: Symbol("snoozing"), // スヌーズ中
});

// イベント時に発生するアクション
export const Action = Object.freeze({
  NONE: Symbol("none"), // 何もしない
  SOUND_ALARM: Symbol("soundAlarm"), // アラームを鳴らす
  STOP_ALARM: Symbol("stopAlarm"), // アラームを止める
});

// 補足:
// JavaScript では 列挙型を上記のように記述するが
// TypeScript では 列挙型を `type Action = "none" | "soundAlarm" | "stopAlarm";` のように代数的データ型を使って記述するのが一般的

// 目覚まし時計クラス
export class AlarmClock {
  #state; // private な属性

  constructor() {
    this.#state = State.NORMAL;
  }

  // アラーム設定イベント
  setAlarm() {
    switch (this.#state) { // stateに応じてアクションが変わる
      case State.NORMAL: // 通常状態の場合
        this.#state = State.ALARM_SET;
        return Action.NONE;
      default:
        return Action.NONE;
    }
  }

  // アラーム解除イベント
  cancelAlarm() {
    switch (this.#state) {
      case State.ALARM_SET: // アラームセット中の場合は通常状態に戻す
        this.#state = State.NORMAL;
        return Action.NONE;
      case State.ALARM_SOUNDING: // アラーム鳴動中の場合はアラームを止める
        this.#state = State.NORMAL;
        return Action.STOP_ALARM;
      case State.SNOOZING: // スヌーズ中の場合は通常状態に戻す
        this.#state = State.NORMAL;
        return Action.NONE;
      default:
        return Action.NONE;
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime() {
    switch (this.#state) {
      case State.ALARM_SET: // アラームセット中の場合はアラームを鳴らす
        this.#state = State.ALARM_SOUNDING;
        return Action.SOUND_ALARM;
      default:
        return Action.NONE; // それ以外は何もしない
    }
  }

  // スヌーズイベント
  snooze() {
    switch (this.#state) {
      case State.ALARM_SOUNDING: // アラーム中の場合はアラームを止める
        this.#state = State.SNOOZING;
        return Action.STOP_ALARM;
      default:
        return Action.NONE; // それ以外は何もしない
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime() {
    switch (this.#state) {
      case State.SNOOZING: // スヌーズ中の場合はアラームを鳴らす
        this.#state = State.ALARM_SOUNDING;
        return Action.SOUND_ALARM;
      default:
        return Action.NONE; // それ以外は何もしない
    }
  }
}
