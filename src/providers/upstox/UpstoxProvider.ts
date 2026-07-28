import { gunzipSync } from "zlib";

import { IBrokerProvider } from "../interfaces/IBrokerProvider";
import { CreateInstrumentData } from "../../modules/instruments/interfaces/IInstrumentRepository";

import { UpstoxHttpClient } from "./core/UpstoxHttpClient";
import { UpstoxConstants } from "./UpstoxConstants";
import { UpstoxInstrument } from "./dto/UpstoxInstrument";
import { InstrumentMapper } from "./mappers/InstrumentMapper";

export class UpstoxProvider implements IBrokerProvider {

    private readonly client: UpstoxHttpClient;

    constructor() {
        this.client = new UpstoxHttpClient();
    }

    async importInstrumentMaster(): Promise<CreateInstrumentData[]> {

        // Download .json.gz file
        const compressedFile =
            await this.client.getBuffer(
                UpstoxConstants.INSTRUMENT_MASTER_URL
            );

        // Unzip
        const jsonBuffer =
            gunzipSync(compressedFile);

        // Convert Buffer -> string
        const json =
            jsonBuffer.toString("utf8");

        // Parse JSON
        const instruments =
            JSON.parse(json) as UpstoxInstrument[];

        // Map to our internal model
        return instruments.map(
            InstrumentMapper.toCreateInstrumentData
        );

    }

}