#!/usr/bin/env node

import * as Figma from "figma-api";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function fetchFigmaDesign() {
  try {
    // Get access token from config
    let accessToken = process.env.FIGMA_ACCESS_TOKEN;
    
    if (!accessToken) {
      try {
        const configPath = join(process.cwd(), 'figma-config.json');
        const config = JSON.parse(readFileSync(configPath, 'utf8'));
        accessToken = config.figmaAccessToken;
      } catch (error) {
        console.error("Could not read figma-config.json");
      }
    }
    
    if (!accessToken) {
      throw new Error("Figma access token is required");
    }

    // Initialize Figma API
    const figma = new Figma.Api({
      personalAccessToken: accessToken,
    });

    // File key from the URL
    const fileKey = "CZNkaVIIdgoV3MI0ebQ8de";
    // Accept node id via CLI arg or env, fallback to hero section
    const rawArg = process.argv[2] || process.env.FIGMA_NODE_ID || "327-1193";
    const nodeId = rawArg.includes("-") ? rawArg.replace("-", ":") : rawArg;
    
    console.log("🎨 Fetching Figma design data...");
    console.log(`📁 File: ${fileKey}`);
    console.log(`🎯 Node: ${nodeId}`);
    console.log("─".repeat(50));

    // Get file data
    const file = await figma.getFile(fileKey);
    
    console.log("📊 File Information:");
    console.log(`Name: ${file.name}`);
    console.log(`Version: ${file.version}`);
    console.log(`Last Modified: ${file.lastModified}`);
    console.log(`Thumbnail: ${file.thumbnailUrl}`);
    console.log("─".repeat(50));

    // Function to find node by ID recursively
    function findNode(node, targetId) {
      if (node.id === targetId) {
        return node;
      }
      
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child, targetId);
          if (found) return found;
        }
      }
      
      return null;
    }

    // Find the specific node
    let targetNode = null;
    let targetPage = null;
    if (file.document && file.document.children) {
      for (const page of file.document.children) {
        targetNode = findNode(page, nodeId);
        if (targetNode) {
          targetPage = page;
          break;
        }
      }
    }

    if (targetNode) {
      console.log("🎯 Target Node Found:");
      console.log(`Page: ${targetPage.name}`);
      console.log(`Name: ${targetNode.name}`);
      console.log(`Type: ${targetNode.type}`);
      if (targetNode.absoluteBoundingBox) {
        console.log(`Size: ${targetNode.absoluteBoundingBox.width} x ${targetNode.absoluteBoundingBox.height}`);
      }
      
      // Output complete node data for detailed analysis
      console.log("\n🔍 COMPLETE NODE DATA:");
      console.log(JSON.stringify(targetNode, null, 2));
      
      // Extract text content and images
      function extractContent(node, content = { texts: [], images: [], components: [] }) {
        if (node.type === 'TEXT' && node.characters) {
          content.texts.push({
            name: node.name,
            text: node.characters,
            style: node.style || {},
            fills: node.fills || []
          });
        }
        
        if (node.type === 'RECTANGLE' && node.fills) {
          node.fills.forEach(fill => {
            if (fill.type === 'IMAGE') {
              content.images.push({
                name: node.name,
                imageRef: fill.imageRef,
                scaleMode: fill.scaleMode
              });
            }
          });
        }
        
        if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
          content.components.push({
            name: node.name,
            type: node.type,
            componentId: node.componentId || node.id
          });
        }
        
        if (node.children) {
          node.children.forEach(child => extractContent(child, content));
        }
        
        return content;
      }
      
      // Display node structure with enhanced details
      function displayNodeStructure(node, indent = 0) {
        const prefix = "  ".repeat(indent);
        console.log(`${prefix}├─ ${node.name} (${node.type})`);
        
        if (node.type === 'TEXT' && node.characters) {
          console.log(`${prefix}   📝 Text: "${node.characters.substring(0, 50)}${node.characters.length > 50 ? '...' : ''}"`);
        }
        
        if (node.fills && node.fills.length > 0) {
          node.fills.forEach(fill => {
            if (fill.type === 'SOLID' && fill.color) {
              const color = fill.color;
              const hex = `#${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`;
              console.log(`${prefix}   🎨 Color: ${hex}`);
            } else if (fill.type === 'IMAGE') {
              console.log(`${prefix}   🖼️  Image: ${fill.imageRef}`);
            }
          });
        }
        
        if (node.children) {
          node.children.forEach(child => displayNodeStructure(child, indent + 1));
        }
      }
      
      console.log("🌳 Design Structure:");
      displayNodeStructure(targetNode);
      
      console.log("\n📄 Content Analysis:");
      const content = extractContent(targetNode);
      
      if (content.texts.length > 0) {
        console.log(`\n📝 Text Elements (${content.texts.length}):`);
        content.texts.forEach((text, i) => {
          console.log(`  ${i + 1}. "${text.text}"`);
        });
      }
      
      if (content.images.length > 0) {
        console.log(`\n🖼️  Images (${content.images.length}):`);
        content.images.forEach((img, i) => {
          console.log(`  ${i + 1}. ${img.name} (${img.imageRef})`);
        });
      }
      
      if (content.components.length > 0) {
        console.log(`\n🧩 Components (${content.components.length}):`);
        content.components.forEach((comp, i) => {
          console.log(`  ${i + 1}. ${comp.name} (${comp.type})`);
        });
      }
      
    } else {
      console.log("❌ Target node not found");
      
      // List all available pages and their top-level frames
      console.log("📄 Available Pages and Frames:");
      if (file.document && file.document.children) {
        file.document.children.forEach(page => {
          console.log(`\n📄 Page: ${page.name} (${page.id})`);
          if (page.children) {
            page.children.forEach(frame => {
              console.log(`  🖼️  Frame: ${frame.name} (${frame.id})`);
            });
          }
        });
      }
    }

    // Get components
    console.log("\n🧩 Fetching Components...");
    try {
      const components = await figma.getFileComponents(fileKey);
      if (components.meta && components.meta.components) {
        console.log(`Found ${Object.keys(components.meta.components).length} components:`);
        Object.values(components.meta.components).forEach(component => {
          console.log(`  • ${component.name} (${component.key})`);
        });
      }
    } catch (error) {
      console.log("No components found or error fetching components");
    }

    // Get styles
    console.log("\n🎨 Styles Information:");
    if (file.styles) {
      Object.entries(file.styles).forEach(([styleId, style]) => {
        console.log(`  • ${style.name} (${style.styleType})`);
      });
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Run the script
fetchFigmaDesign();
