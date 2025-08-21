#!/bin/bash

echo "Adding favicon to all HTML files..."

# Add favicon to all HTML files in root and website directory
for file in *.html website/*.html; do
    if [ -f "$file" ] && ! grep -q "favicon" "$file"; then
        echo "Adding favicon to $file..."
        
        # Add favicon links after the description meta tag
        sed -i '' '/<meta name="description"/a\
\    \
\    <!-- Favicon -->\
\    <link rel="icon" type="image/png" href="/favicon.png">\
\    <link rel="apple-touch-icon" href="/favicon.png">\
' "$file"
    fi
done

echo "Favicon added to all HTML files!"