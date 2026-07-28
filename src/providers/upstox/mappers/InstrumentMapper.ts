import { CreateInstrumentData } from "../../../modules/instruments/interfaces/IInstrumentRepository";
import { UpstoxInstrument } from "../dto/UpstoxInstrument";

export class InstrumentMapper {

    static toCreateInstrumentData(
        instrument: UpstoxInstrument
    ): CreateInstrumentData {

        return {

            exchange: instrument.exchange,

            segment: instrument.segment,

            instrumentKey: instrument.instrument_key,

            exchangeToken: instrument.exchange_token ?? null,

            tradingSymbol: instrument.trading_symbol,

            name: instrument.name ?? null,

            instrumentType: instrument.instrument_type ?? null,

            expiry: instrument.expiry
                ? new Date(instrument.expiry)
                : null,

            strikePrice: instrument.strike_price ?? null,

            optionType: instrument.option_type ?? null,

            lotSize: instrument.lot_size ?? null,

            tickSize: instrument.tick_size ?? null,

            freezeQuantity: instrument.freeze_quantity ?? null,

            minimumLot: instrument.minimum_lot ?? null,

            isin: instrument.isin ?? null,

            status: "ACTIVE",

        };

    }

}