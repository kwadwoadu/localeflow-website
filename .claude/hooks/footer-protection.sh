#!/bin/bash
# Footer Protection Hook for LocaleFlow Website
# Warns when Footer.astro edits might remove required links

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

# Only validate Footer.astro edits
if [[ "$FILE_PATH" != *"Footer.astro"* ]]; then
    exit 0
fi

# Get the new content being written
NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')

# Required links that must exist in footer
REQUIRED_LINKS=(
    "/compare"
    "/roi-calculator"
    "/compare/hextom"
    "/compare/t-lab"
    "/compare/transtore"
    "/compare/langwill"
    "/compare/ciwi"
    "/compare/locales-ai"
    "/compare/vt-labs"
    "/compare/liquid-translator"
    "/blog/localeflow-vs-weglot"
    "/blog/localeflow-vs-langify"
    "/blog/localeflow-vs-transcy"
    "/blog/localeflow-vs-translate-and-adapt"
)

# For Edit operations, check if any required link is being removed
if [[ -n "$NEW_CONTENT" ]]; then
    for link in "${REQUIRED_LINKS[@]}"; do
        if [[ "$NEW_CONTENT" != *"$link"* ]]; then
            echo "WARNING: Footer edit may be removing required link: $link" >&2
        fi
    done
fi

# Allow the operation (change to exit 2 to block)
exit 0
