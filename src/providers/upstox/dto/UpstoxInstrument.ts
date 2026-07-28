export interface UpstoxInstrument {

    instrument_key: string;

    exchange: string;

    segment: string;

    exchange_token: string;

    trading_symbol: string;

    name: string;

    instrument_type: string;

    expiry: string | null;

    strike_price: number | null;

    option_type: string | null;

    lot_size: number;

    tick_size: number;

    freeze_quantity: number | null;

    minimum_lot: number | null;

    isin: string | null;

}