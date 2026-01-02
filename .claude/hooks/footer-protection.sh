#!/bin/bash
# Footer Protection Hook for LocaleFlow Website
# BLOCKS edits that remove required links from Footer.astro

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

# Only validate Footer.astro edits
if [[ "$FILE_PATH" != *"Footer.astro"* ]]; then
    exit 0
fi

# Get the tool being used
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Get content based on tool type
if [[ "$TOOL_NAME" == "Write" ]]; then
    # For Write, we have the full file content
    NEW_CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // empty')
elif [[ "$TOOL_NAME" == "Edit" ]]; then
    # For Edit, we need to check if old_string contains links being removed
    OLD_STRING=$(echo "$INPUT" | jq -r '.tool_input.old_string // empty')
    NEW_STRING=$(echo "$INPUT" | jq -r '.tool_input.new_string // empty')
fi

# Required links that must exist in footer
# Core links + all comparison pages/posts for SEO internal linking
REQUIRED_LINKS=(
    "/compare"
    "/roi-calculator"
    "/blog"
    "/partners"
    "/privacy"
    "/terms"
    "/blog/localeflow-vs-langify"
    "/blog/localeflow-vs-weglot"
    "/blog/localeflow-vs-transcy"
    "/blog/localeflow-vs-translate-and-adapt"
    "/compare/hextom"
    "/compare/t-lab"
    "/compare/transtore"
    "/compare/vt-labs"
    "/compare/locales-ai"
    "/compare/ciwi"
    "/compare/langwill"
    "/compare/liquid-translator"
)

BLOCKED=false

# For Write operations: check if new content has all required links
if [[ "$TOOL_NAME" == "Write" ]] && [[ -n "$NEW_CONTENT" ]]; then
    for link in "${REQUIRED_LINKS[@]}"; do
        if [[ "$NEW_CONTENT" != *"$link"* ]]; then
            echo "BLOCKED: Footer write is missing required link: $link" >&2
            BLOCKED=true
        fi
    done
fi

# For Edit operations: check if a required link is being removed
if [[ "$TOOL_NAME" == "Edit" ]] && [[ -n "$OLD_STRING" ]]; then
    for link in "${REQUIRED_LINKS[@]}"; do
        # If old_string contains a required link but new_string doesn't, it's being removed
        if [[ "$OLD_STRING" == *"$link"* ]] && [[ "$NEW_STRING" != *"$link"* ]]; then
            echo "BLOCKED: Footer edit is removing required link: $link" >&2
            BLOCKED=true
        fi
    done
fi

if [[ "$BLOCKED" == "true" ]]; then
    echo "" >&2
    echo "Footer.astro is protected. Core links must remain." >&2
    echo "Required: /compare, /roi-calculator, /blog, /partners, /privacy, /terms" >&2
    exit 2
fi

exit 0
