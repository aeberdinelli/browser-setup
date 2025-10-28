#!/bin/bash
set -e

echo "🚀 Setting up browser-launcher service..."

APP_NAME="com.user.browser-launcher"

# Resolve absolute path to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/server"
PLIST_PATH="$HOME/Library/LaunchAgents/$APP_NAME.plist"
NODE_PATH="$(which node)"

# Check Node.js exists
if [ -z "$NODE_PATH" ]; then
	echo "❌ Node.js not found. Please install Node before running this script."
	exit 1
fi

# Ensure index.js exists
if [ ! -f "$PROJECT_DIR/index.js" ]; then
	echo "❌ index.js not found in $PROJECT_DIR"
	exit 1
fi

# Go to project directory
cd "$PROJECT_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
	echo "📦 Installing npm dependencies..."
	npm install --silent
else
	echo "✅ Dependencies already installed."
fi

# Create LaunchAgent plist (user-level autostart)
cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>$APP_NAME</string>
	<key>ProgramArguments</key>
	<array>
		<string>$NODE_PATH</string>
		<string>$PROJECT_DIR/index.js</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
	<key>KeepAlive</key>
	<true/>
	<key>StandardOutPath</key>
	<string>/dev/null</string>
	<key>StandardErrorPath</key>
	<string>/dev/null</string>
	<key>WorkingDirectory</key>
	<string>$PROJECT_DIR</string>
</dict>
</plist>
EOF

echo "🧩 Created LaunchAgent: $PLIST_PATH"

# Reload if already loaded
if launchctl list | grep -q "$APP_NAME"; then
	echo "🔄 Reloading existing service..."
	launchctl unload "$PLIST_PATH" >/dev/null 2>&1 || true
fi

launchctl load "$PLIST_PATH"

# Run immediately if not already running
if ! pgrep -f "$PROJECT_DIR/index.js" >/dev/null; then
	echo "▶️  Starting server manually..."
	nohup "$NODE_PATH" "$PROJECT_DIR/index.js" >/dev/null 2>&1 &
else
	echo "✅ Server already running."
fi

# Copy finicky config to home folder
echo "Copying finicky config to $HOME/.finicky.ts..."
cp finicky.ts $HOME/.finicky.ts

echo "🎉 All done!"
