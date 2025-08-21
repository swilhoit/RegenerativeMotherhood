# Quick Start Guide - Figma MCP Server

## ✅ Setup Complete!

Your Figma MCP server is ready to use! Here's what has been configured:

### 🔑 Figma Access Token
✅ **Configured**: Your Figma access token is stored in `figma-config.json`

### 🛠️ Dependencies
✅ **Installed**: All required packages including MCP SDK and Figma API

### 🏗️ Build
✅ **Built**: TypeScript compiled to JavaScript in `dist/` folder

### 🧪 Testing
✅ **Tested**: Server responds correctly to MCP tool list requests

## 🚀 How to Use

### Option 1: Add to Claude Desktop

1. Open your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add this configuration:
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "node",
         "args": ["/Volumes/Elements/Cursor Projects/RM Website/dist/index.js"],
         "cwd": "/Volumes/Elements/Cursor Projects/RM Website"
       }
     }
   }
   ```

3. Restart Claude Desktop

### Option 2: Manual Server Start

Run the server directly:
```bash
./start-server.sh
```

## 🔧 Available Tools

Once connected to Claude, you can use these Figma tools:

1. **`get_figma_file`** - Get detailed file information
   ```
   Get information about Figma file with key: ABC123
   ```

2. **`get_file_components`** - Extract all components
   ```
   Get all components from Figma file ABC123
   ```

3. **`get_team_projects`** - List team projects
   ```
   Get all projects for Figma team TEAM_ID
   ```

4. **`search_files`** - Search for files
   ```
   Search for Figma files containing "design system"
   ```

5. **`get_file_versions`** - Get version history
   ```
   Get version history for Figma file ABC123
   ```

## 📝 Finding Figma IDs

### File Key
From URL: `https://www.figma.com/file/ABC123/My-Design`
File key: `ABC123`

### Team ID
From URL: `https://www.figma.com/files/team/TEAM_ID/Team-Name`
Team ID: `TEAM_ID`

## 🔍 Troubleshooting

- **Server not starting**: Make sure Node.js is installed and in PATH
- **Token errors**: Check that your Figma token in `figma-config.json` is valid
- **Claude not seeing tools**: Verify the path in Claude Desktop config is correct
- **Permission errors**: Make sure the startup script is executable (`chmod +x start-server.sh`)

## 🎉 You're Ready!

Your Figma MCP server is fully configured and ready to use with Claude Desktop or any MCP-compatible client.
