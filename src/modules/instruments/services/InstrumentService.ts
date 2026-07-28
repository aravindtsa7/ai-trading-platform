import { Instrument } from "@prisma/client";

import {
    IInstrumentRepository,
} from "../interfaces/IInstrumentRepository";

import { BrokerFactory } from "../../../providers/factory/BrokerFactory";
import { BrokerType } from "../../../providers/BrokerType";

export class InstrumentService {

    constructor(
        private readonly instrumentRepository: IInstrumentRepository
    ) {}

    async importFromBroker(
        brokerType: BrokerType
    ): Promise<number> {

        const provider =
            BrokerFactory.getProvider(
                brokerType
            );

        const instruments =
            await provider.importInstrumentMaster();

        await this.instrumentRepository.deleteAll();

        await this.instrumentRepository.createMany(
            instruments
        );

        return instruments.length;

    }

    async search(
        query: string
    ): Promise<Instrument[]> {

        return this.instrumentRepository.search(
            query
        );

    }

    async getByInstrumentKey(
        instrumentKey: string
    ): Promise<Instrument | null> {

        return this.instrumentRepository.findByInstrumentKey(
            instrumentKey
        );

    }

}