import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: "notifications",
                brokers: ['together-hog-9865-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'dG9nZXRoZXItaG9nLTk4NjUkHVP-EpPfL-ucvDhB2yGNbOwBZyWaulaMKFRn-cI',
                    password: '6XtyBcREOx1TjVA0VH_T9KaEpqjXb1UVdI2qCRAT9uukHEvqa3Fra5cHASfZ-aISURPlhw==',
                },
                ssl: true,
            }
        });
    }
    async onModuleDestroy() {
        await this.close();
    }
}