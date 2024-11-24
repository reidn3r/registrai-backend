import { PrismaClient } from "@prisma/client";

export class DBProvider {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  getClient(): PrismaClient {
    return this.client;
  }
}
