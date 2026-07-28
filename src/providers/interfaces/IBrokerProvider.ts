import { CreateInstrumentData } from "../../modules/instruments/interfaces/IInstrumentRepository";

export interface IBrokerProvider {
    importInstrumentMaster(): Promise<CreateInstrumentData[]>;
}