import { judge31DaysWithIF, judge31DaysWithSWITCH } from "./index.js";

describe("月ごとに31日あるかを判定する", () => {
  test("ニシムクサムライ ", () => {
    expect(judge31DaysWithIF("Feb")).toBe(false);
    expect(judge31DaysWithIF("Apr")).toBe(false);
    expect(judge31DaysWithIF("Jun")).toBe(false);
    expect(judge31DaysWithIF("Sep")).toBe(false);
    expect(judge31DaysWithIF("Nov")).toBe(false);

    expect(judge31DaysWithSWITCH("Feb")).toBe(false);
    expect(judge31DaysWithSWITCH("Apr")).toBe(false);
    expect(judge31DaysWithSWITCH("Jun")).toBe(false);
    expect(judge31DaysWithSWITCH("Sep")).toBe(false);
    expect(judge31DaysWithSWITCH("Nov")).toBe(false);

  });
  test("31日ある月 ", () => {
    expect(judge31DaysWithIF("Jan")).toBe(true);
    expect(judge31DaysWithIF("Mar")).toBe(true);
    expect(judge31DaysWithIF("May")).toBe(true);
    expect(judge31DaysWithIF("Jul")).toBe(true);
    expect(judge31DaysWithIF("Aug")).toBe(true);
    expect(judge31DaysWithIF("Oct")).toBe(true);
    expect(judge31DaysWithIF("Dec")).toBe(true);

    expect(judge31DaysWithSWITCH("Jan")).toBe(true);
    expect(judge31DaysWithSWITCH("Mar")).toBe(true);
    expect(judge31DaysWithSWITCH("May")).toBe(true);
    expect(judge31DaysWithSWITCH("Jul")).toBe(true);
    expect(judge31DaysWithSWITCH("Aug")).toBe(true);
    expect(judge31DaysWithSWITCH("Oct")).toBe(true);
    expect(judge31DaysWithSWITCH("Dec")).toBe(true);
  });
});
