#!/usr/bin/env node
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Load package.json synchronously for compatibility with compiled output
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, "../../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const FRONTEND_DIR = path.resolve(__dirname, "../../frontend");
import { AppBuilder } from './appBuilder.js';
import { FileAccess } from '../data_access/fileAccess.js';
import { CleanArchAccess } from '../data_access/cleanArchInfoAccess.js';
import { SessionDBAccess } from "../data_access/sessionDBAccess.js";
import { GraphVerificationController } from '../interface_adapter/graphVerification/graphVerificationController.js';
import { GraphVerificationInteractor } from '../use_case/graphVerification/graphVerificationInteractor.js';
import { startServer } from "../server/server.js";

const program = new Command();

const app = new AppBuilder()
  .withFileAccess(new FileAccess())
  .withCleanArchAccess(new CleanArchAccess())
  .withSessionDBAccess(new SessionDBAccess())
  .buildGraphVerificationInteractor(GraphVerificationInteractor)
  .buildGraphVerificationController(GraphVerificationController)

program.version(packageJson.version);

program
  .command('start')
  .description('Start the express server to listen for requests')
  .action(async() => {
    app.runGraphVerification();
    startServer();
  })

program
  .command('verify')
  .description('Verify whether the use cases found in child directories adhere to Clean Architeccture')
  .action(async() => {
    app.runGraphVerification();
  })

program.parse(process.argv);

program
  .command('end')
  .description('Close the express server and clean the tempdir')
  .action(async() => {
    
  })
