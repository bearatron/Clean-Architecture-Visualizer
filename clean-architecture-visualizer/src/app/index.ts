#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from '../../package.json' with { type: "json"};
import { AppBuilder } from './appBuilder.js';
import { FileAccess } from '../data_access/fileAccess.js';
import { ValidOutNeighbourAccess } from '../data_access/validOutNeighbourAccess.js';
import { GraphVerificationController } from '../interface_adapter/graphVerification/graphVerificationController.js';
import { GraphVerificationInteractor } from '../use_case/graphVerification/graphVerificationInteractor.js';

const program = new Command();

const app = new AppBuilder()
  .withFileAccess(new FileAccess())
  .withValidOutNeighbourAccess(new ValidOutNeighbourAccess())
  .buildGraphVerificationInteractor(GraphVerificationInteractor)
  .buildGraphVerificationController(GraphVerificationController)

program
  .name('cave')
  .version(packageJson.version);

program
  .command('verify')
  .action(async() => {
    app.runGraphVerification();
  })
program.parse(process.argv);
