export interface UpstoxInstrument {
  exchange: string;
  segment: string;
  instrument_key: string;
  exchange_token?: string;
  trading_symbol: string;
  name?: string;
  instrument_type?: string;
  expiry?: string;
  strike_price?: number;
  option_type?: string;
  lot_size?: number;
  tick_size?: number;
  freeze_quantity?: number;
  minimum_lot?: number;
  isin?: string;
}

export function mapUpstoxInstrument(
  instrument: UpstoxInstrument
) {
  return {
    exchange: instrument.exchange,
    segment: instrument.segment,
    instrumentKey: instrument.instrument_key,
    exchangeToken: instrument.exchange_token,

    tradingSymbol: instrument.trading_symbol,

    name: instrument.name,

    instrumentType: instrument.instrument_type,

    expiry: instrument.expiry
      ? new Date(instrument.expiry)
      : undefined,

    strikePrice: instrument.strike_price,

    optionType: instrument.option_type,

    lotSize: instrument.lot_size,

    tickSize: instrument.tick_size,

    freezeQuantity: instrument.freeze_quantity,

    minimumLot: instrument.minimum_lot,

    isin: instrument.isin,

    status: "ACTIVE",
  };
}