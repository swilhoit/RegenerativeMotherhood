# Figma MCP Server Setup Instructions

## Prerequisites

You need to install Node.js and npm before you can run this Figma MCP server.

### Option 1: Install Node.js using Homebrew (Recommended for macOS)

1. First, install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Node.js:
   ```bash
   brew install node
   ```

3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Option 2: Install Node.js from Official Website

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

### Option 3: Install Node.js using nvm (Node Version Manager)

1. Install nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Restart your terminal or run:
   ```bash
   source ~/.zshrc
   ```

3. Install the latest LTS Node.js:
   ```bash
   nvm install --lts
   nvm use --lts
   ```

## After Installing Node.js

1. Navigate to the project directory:
   ```bash
   cd "/Volumes/Elements/Cursor Projects/RM Website"
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Copy and configure the environment file:
   ```bash
   cp env.example .env
   ```

4. Edit the `.env` file and add your Figma access token:
   ```bash
   nano .env
   # or use your preferred editor
   ```

5. Build the project:
   ```bash
   npm run build
   ```

6. Test the server:
   ```bash
   npm run dev
   ```

## Getting Your Figma Access Token

1. Go to [Figma Account Settings](https://www.figma.com/developers/api#access-tokens)
2. Scroll down to "Personal access tokens"
3. Click "Generate new token"
4. Give it a descriptive name (e.g., "MCP Server Token")
5. Copy the token and paste it into your `.env` file

## Next Steps

Once you have Node.js installed and the project set up:

1. **Configure Claude Desktop**: Add the MCP server to your Claude Desktop configuration
2. **Test the Integration**: Try using the Figma tools in Claude
3. **Customize**: Modify the server code to add more Figma API functionality as needed

## Troubleshooting

- **Permission Issues**: You might need to use `sudo` for some commands
- **Path Issues**: Make sure Node.js is in your PATH after installation
- **Port Conflicts**: The MCP server uses stdio, so no port configuration is needed
- **API Limits**: Be aware of Figma's API rate limits when testing

## Support

If you encounter issues:
1. Check that Node.js and npm are properly installed
2. Verify your Figma access token is valid
3. Check the console output for error messages
4. Ensure your Figma file keys and team IDs are correct
