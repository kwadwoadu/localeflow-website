#!/bin/bash
# Auto-Format Hook for LocaleFlow Website
# PostToolUse hook that formats Astro/TS/TSX files after edits

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

# Skip if no file path
if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# Format Astro, TypeScript, JavaScript files
if [[ "$FILE_PATH" == *.astro ]] || [[ "$FILE_PATH" == *.ts ]] || [[ "$FILE_PATH" == *.tsx ]] || [[ "$FILE_PATH" == *.js ]] || [[ "$FILE_PATH" == *.jsx ]]; then
    if [ -f "$FILE_PATH" ]; then
        cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
        npx prettier --write "$FILE_PATH" 2>/dev/null || true
    fi
fi

exit 0
