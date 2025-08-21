#!/bin/bash

# Update all .html links to clean URLs in website directory
cd website

# Replace specific .html links with clean URLs
files="*.html"

for file in $files; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Update common page links
        sed -i '' 's/href="index\.html"/href="\/"/g' "$file"
        sed -i '' 's/href="work-with-me\.html"/href="\/work-with-me"/g' "$file"
        sed -i '' 's/href="3-call-sleep-support\.html"/href="\/3-call-sleep-support"/g' "$file"
        sed -i '' 's/href="comprehensive-sleep-support\.html"/href="\/comprehensive-sleep-support"/g' "$file"
        sed -i '' 's/href="sleep-guidance-call\.html"/href="\/sleep-guidance-call"/g' "$file"
        
        # Update any remaining .html links
        sed -i '' 's/href="\([^"]*\)\.html"/href="\/\1"/g' "$file"
    fi
done

echo "All links updated!"