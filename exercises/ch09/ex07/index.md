### テストの実行から以下のエラー
√ #push (3 ms)
    × #pushAll (2 ms)

  ● InstrumentedLinkedList › #pushAll

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 4

      10 |     const list = new InstrumentedLinkedList();
      11 |     list.pushAll("A", "B");
    > 12 |     expect(list.pushCount).toBe(2);

2つ目のテストで期待値2に対して4が返ってしまっている。→２回実行されている？