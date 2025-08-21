#!/bin/bash

echo "Fixing index.html# anchor links..."

# Fix all index.html#anchor links to be just /#anchor
for file in *.html website/*.html; do
    if [ -f "$file" ]; then
        echo "Checking $file..."
        # Replace index.html#anchor with /#anchor
        sed -i '' 's/href="index\.html#/href="\/#/g' "$file"
    fi
done

echo "All index.html# links have been fixed!"