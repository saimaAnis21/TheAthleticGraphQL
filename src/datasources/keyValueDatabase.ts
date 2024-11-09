import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { DataSource } from "apollo-datasource";

const DB_FILE = "./keyValueDatabase.json";
let database: { [key: string]: Object };

try {
  database = JSON.parse(readFileSync(DB_FILE, "utf-8"));
} catch (e) {
  database = {};
}

/**
 * This is a simple key-value database that is running at your local. It should be used for
 * development only and we should look for a way to migrate to AWS Dynamo before going live.
 *
 * In case you haven't noticed, it was inspired by Dynamo concepts, with records indexed using a
 * partition key and an optional sort key. Think of it as one table in Dynamo if that makes sense.
 *
 * It is embarassing to call this a Dynamo parody, but it should hopefully be enough for you to
 * showcase your creativity and Dynamo understanding. Good luck and have fun.
 */
export class KeyValueDatabase extends DataSource {
  async get({
    partitionKey,
    sortKey = "",
  }: {
    partitionKey: string;
    sortKey?: string;
  }): Promise<Object | undefined> {
    return database[partitionKey + ":" + sortKey];
  }

  async query({ partitionKey }: { partitionKey: string }): Promise<Object[]> {
    return Object.keys(database)
      .filter((key) => key.startsWith(partitionKey + ":"))
      .map((key) => database[key]);
  }

  async scan(): Promise<Object[]> {
    return Object.values(database);
  }

  async put({
    partitionKey,
    sortKey = "",
    item,
  }: {
    partitionKey: string;
    sortKey?: string;
    item: Object;
  }) {
    database[partitionKey + ":" + sortKey] = item;
    writeFile(DB_FILE, JSON.stringify(database));
    return database[partitionKey + ":" + sortKey];
  }

  async delete({
    partitionKey,
    sortKey = "",
  }: {
    partitionKey: string;
    sortKey?: string;
    }) {
    
    const allEntries: Array<any> = Object.keys(database)
      .filter((key) => key.startsWith(partitionKey + ":"))
      .map((key) => database[key]);
    
    allEntries.forEach((i) => delete database[partitionKey + ":" + i.id]);
    
    writeFile(DB_FILE, JSON.stringify(database));
  }
}
