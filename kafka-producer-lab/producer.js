const { Kafka } = require("kafkajs");
const { randomUUID } = require("node:crypto");

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "teste-kafka-producer",
    brokers: ["together-hog-9865-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "dG9nZXRoZXItaG9nLTk4NjUkHVP-EpPfL-ucvDhB2yGNbOwBZyWaulaMKFRn-cI",
      password:
        "6XtyBcREOx1TjVA0VH_T9KaEpqjXb1UVdI2qCRAT9uukHEvqa3Fra5cHASfZ-aISURPlhw==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
