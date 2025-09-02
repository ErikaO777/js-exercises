import {
  AlarmClock,
  normal,
  alarmSet,
  alarmSounding,
  snoozing,
} from "./index.js";

// AlarmClockからインスタンスを生成したが、それぞれ状態からインスタンスを作成した方がよい？
// 遷移の状態を確認するテストはこれでよいか？

describe("AlarmClock", () => {
  it("初期状態:normal", () => {
    const clock = new AlarmClock();
    expect(clock.getState() instanceof normal).toBe(true);
  });

  // 通常状態　→ アラームセット中へ遷移
  it("normal -> alarmSet", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    expect(clock.getState() instanceof alarmSet).toBe(true); // アラームセットをすると、状態がアラームセット中に変わる
  });

  // アラームセット中 →通常か、アラーム鳴動中へ遷移
  it("alarmSet -> alarmSounding", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    expect(clock.getState() instanceof alarmSounding).toBe(true);
  });
  it("alarmSet -> normal", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.cancelAlarm();
    expect(clock.getState() instanceof normal).toBe(true);
  });

  // アラーム鳴動中 →スヌーズ中か、通常へ遷移
  it("alarmSounding -> snoozing", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.snooze();
    expect(clock.getState() instanceof snoozing).toBe(true);
  });

    it("alarmSounding -> normal", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.cancelAlarm();
    expect(clock.getState() instanceof normal).toBe(true);
  });

  // スヌーズ中 → アラーム鳴動中か通常へ遷移
  it("snoozing -> alarmSounding", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.elapseSnoozeTime();
    expect(clock.getState() instanceof alarmSounding).toBe(true);
  });

    it("snoozing -> normal", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.snooze();
    clock.cancelAlarm();
    expect(clock.getState() instanceof normal).toBe(true);
    })
  });
