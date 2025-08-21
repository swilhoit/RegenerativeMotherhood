#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import * as Figma from "figma-api";
import { z } from "zod";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables
dotenv.config();

// Validation schemas
const GetFileSchema = z.object({
  fileKey: z.string().describe("The Figma file key from the URL"),
});

const GetComponentsSchema = z.object({
  fileKey: z.string().describe("The Figma file key from the URL"),
});

const GetTeamProjectsSchema = z.object({
  teamId: z.string().describe("The Figma team ID"),
});

const SearchFilesSchema = z.object({
  query: z.string().describe("Search query for files"),
  teamId: z.string().optional().describe("Optional team ID to search within"),
});

class FigmaMCPServer {
  private server: Server;
  private figma: Figma.Api;

  constructor() {
    // Initialize Figma API - try environment variable first, then config file
    let accessToken = process.env.FIGMA_ACCESS_TOKEN;
    
    if (!accessToken) {
      try {
        const configPath = join(process.cwd(), 'figma-config.json');
        const config = JSON.parse(readFileSync(configPath, 'utf8'));
        accessToken = config.figmaAccessToken;
      } catch (error) {
        // Config file doesn't exist or is invalid
      }
    }
    
    if (!accessToken) {
      throw new Error("Figma access token is required. Set FIGMA_ACCESS_TOKEN environment variable or create figma-config.json");
    }

    this.figma = new Figma.Api({
      personalAccessToken: accessToken,
    });

    // Initialize MCP server
    this.server = new Server(
      {
        name: "figma-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_figma_file",
            description: "Get detailed information about a Figma file including all frames, components, and styles",
            inputSchema: {
              type: "object",
              properties: {
                fileKey: {
                  type: "string",
                  description: "The Figma file key from the URL (e.g., 'abc123' from figma.com/file/abc123/...)",
                },
              },
              required: ["fileKey"],
            },
          },
          {
            name: "get_file_components",
            description: "Get all components from a Figma file with their metadata",
            inputSchema: {
              type: "object",
              properties: {
                fileKey: {
                  type: "string",
                  description: "The Figma file key from the URL",
                },
              },
              required: ["fileKey"],
            },
          },
          {
            name: "get_team_projects",
            description: "Get all projects for a specific Figma team",
            inputSchema: {
              type: "object",
              properties: {
                teamId: {
                  type: "string",
                  description: "The Figma team ID",
                },
              },
              required: ["teamId"],
            },
          },
          {
            name: "search_files",
            description: "Search for Figma files by name or content",
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query for files",
                },
                teamId: {
                  type: "string",
                  description: "Optional team ID to search within",
                },
              },
              required: ["query"],
            },
          },
          {
            name: "get_file_versions",
            description: "Get version history of a Figma file",
            inputSchema: {
              type: "object",
              properties: {
                fileKey: {
                  type: "string",
                  description: "The Figma file key from the URL",
                },
              },
              required: ["fileKey"],
            },
          },
        ] satisfies Tool[],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_figma_file": {
            const { fileKey } = GetFileSchema.parse(args);
            const file = await this.figma.getFile(fileKey);
            
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(file, null, 2),
                },
              ],
            };
          }

          case "get_file_components": {
            const { fileKey } = GetComponentsSchema.parse(args);
            const components = await this.figma.getFileComponents(fileKey);
            
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(components, null, 2),
                },
              ],
            };
          }

          case "get_team_projects": {
            const { teamId } = GetTeamProjectsSchema.parse(args);
            const projects = await this.figma.getTeamProjects(teamId);
            
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(projects, null, 2),
                },
              ],
            };
          }

          case "search_files": {
            const { query, teamId } = SearchFilesSchema.parse(args);
            
            // Note: Figma API doesn't have a direct search endpoint
            // This is a simplified implementation that would need to be enhanced
            // based on your specific needs
            let searchResults;
            
            if (teamId) {
              const projects = await this.figma.getTeamProjects(teamId);
              searchResults = {
                query,
                teamId,
                note: "Search functionality would need to be implemented based on your specific requirements. This could involve getting all files from projects and filtering them.",
                projects: projects.projects?.map((p: any) => ({
                  id: p.id,
                  name: p.name,
                })),
              };
            } else {
              searchResults = {
                query,
                note: "To search files, you typically need to provide a team ID first to get projects, then get files from those projects.",
              };
            }
            
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(searchResults, null, 2),
                },
              ],
            };
          }

          case "get_file_versions": {
            const { fileKey } = GetFileSchema.parse(args);
            const versions = await this.figma.getVersions(fileKey);
            
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(versions, null, 2),
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Figma MCP server running on stdio");
  }
}

// Start the server
const server = new FigmaMCPServer();
server.run().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
