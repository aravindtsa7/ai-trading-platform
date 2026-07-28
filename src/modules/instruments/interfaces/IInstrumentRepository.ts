import { Instrument } from "@prisma/client";

export interface CreateInstrumentData {
  exchange: string;
  segment: string;
  instrumentKey: string;

  exchangeToken: string | null;

  tradingSymbol: string;

  name: string | null;

  instrumentType: string | null;

  expiry: Date | null;

  strikePrice: number | null;

  optionType: string | null;

  lotSize: number | null;

  tickSize: number | null;

  freezeQuantity: number | null;

  minimumLot: number | null;

  isin: string | null;

  status: string | null;
}

export interface IInstrumentRepository {
  createMany(
    instruments: CreateInstrumentData[]
  ): Promise<void>;

  deleteAll(): Promise<void>;

  search(
    query: string
  ): Promise<Instrument[]>;

  findByInstrumentKey(
    instrumentKey: string
  ): Promise<Instrument | null>;
}