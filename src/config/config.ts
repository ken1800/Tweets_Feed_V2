import express, { Application } from "express";
export const app: Application = express();
export const configDb = require("./db");
export const db = configDb.db;
