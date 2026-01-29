import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.configurations.list.path, async (req, res) => {
    const configs = await storage.getConfigurations();
    res.json(configs);
  });

  app.post(api.configurations.create.path, async (req, res) => {
    try {
      const input = api.configurations.create.input.parse(req.body);
      const config = await storage.createConfiguration(input);
      res.status(201).json(config);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.configurations.delete.path, async (req, res) => {
    await storage.deleteConfiguration(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}
