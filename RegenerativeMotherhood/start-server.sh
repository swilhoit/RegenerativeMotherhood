#!/bin/bash

# Figma MCP Server Startup Script

# Load nvm if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Change to the project directory
cd "$(dirname "$0")"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js and try again"
    exit 1
fi

# Check if the project is built
if [ ! -d "dist" ]; then
    echo "Building the project..."
    npm run build
fi

# Start the server
echo "Starting Figma MCP Server..."
node dist/index.js

