export interface HistoricalCandleDto {
  instrumentKey: string;
  interval:
    | "1minute"
    | "3minute"
    | "5minute"
    | "10minute"
    | "15minute"
    | "30minute"
    | "60minute"
    | "day"
    | "week"
    | "month";
  fromDate: string;
  toDate: string;
}