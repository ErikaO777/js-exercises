// GoFのStateパターンとは、オブジェクトの状態に応じて振る舞いが変わるようにするデザインパターンのこと

// 目覚まし時計の状態
// 通常
// アラームセット中
// アラーム鳴動中
// スヌーズ中

// 返り値は以下
// normal: 通常
// alarmSet: アラームをセットする
// alarmSounding: アラーム鳴動中
// snoozing: スヌーズ中

// none: 何もしない
// soundAlarm: アラームを鳴らす
// stopAlarm: アラームをキャンセルする

// --------------- イベント時に発生する共通のアクション ------------------
// stateのセット
export class clockState {
    setAlarm(clock) { // アラームの設定
    }

    cancelAlarm(clock) { // アラームのキャンセル
    }

    snooze(clock) { // スヌーズの設定
    }

    reachedToAlarmTime(clock) { // アラーム設定時刻到達
    }

    elapseSnoozeTime(clock) { // スヌーズ時間の経過
    }
}

// -------------------------- 状態は4つ -------------------------------
// 通常状態
export class normal extends clockState { // 通常状態　→ アラームセット中へ遷移
    setAlarm(clock) {
        // アラームをセットする
        clock.setState(new alarmSet());
        return Symbol("setAlarm");
    }
}

// アラームセット中状態
export class alarmSet extends clockState { // アラームセット中 →通常か、アラーム鳴動中へ遷移
    cancelAlarm(clock) {
        // アラームを解除する
        clock.setState(new normal());
        return Symbol("cancelAlarm");
    }

    reachedToAlarmTime(clock) {
        // アラーム設定時刻到達
        clock.setState(new alarmSounding());
        return Symbol("reachedToAlarmTime");
    }
}

// アラーム鳴動中状態
export class alarmSounding extends clockState { // アラーム鳴動中 →スヌーズ中か、通常へ遷移
    snooze(clock) {
        // スヌーズする
        clock.setState(new snoozing());
        return Symbol("snooze");
    }
    cancelAlarm(clock) {
        // アラームを解除する
        clock.setState(new normal());
        return Symbol("cancelAlarm");
    }
}

// スヌーズ中状態
export class snoozing extends clockState { // スヌーズ中 → アラーム鳴動中か通常へ遷移
    elapseSnoozeTime(clock) {
        // スヌーズ時間経過
        clock.setState(new alarmSounding());
        return Symbol("elapseSnoozeTime");
    }

    cancelAlarm(clock) {
        // アラームを解除する
        clock.setState(new normal());
        return Symbol("cancelAlarm");
    }
}

// -------------------------- 目覚まし時計本体 --------------------------------
// 現在の状態を管理
export class AlarmClock { 
  #state; // private な属性

  constructor() {
    this.#state = new clockState;
  }

  setState(state) {
    this.#state = state;
  }

  // アラームの設定
  setAlarm() {
    this.#state.setAlarm(this);
  }

  // アラームのキャンセル
  cancelAlarm() {
    this.#state.cancelAlarm(this);
  }

  // アラーム設定時刻到達
  reachedToAlarmTime() {
    this.#state.reachedToAlarmTime(this);
  }

  // スヌーズの設定
  snooze() {
    this.#state.snooze(this);
  }

  // スヌーズ時間の経過
  elapseSnoozeTime() {
    this.#state.elapseSnoozeTime(this);
  }

}
