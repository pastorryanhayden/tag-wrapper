# Tag Wrapper

A plugin for Obsidian that allows you to wrap selected text with custom HTML tags.

## Motivation
I created this plugin because I print my notes as handouts and didn't want to have to create two separate notes or to recreate my notes in a word processor like Microsoft Word or Pages.  I created a few CSS rules that added some styles to my notes when they are printed, but this CSS required adding custom HTML tags with classes (i.e. `<span class="blank">Some Text</span>`).
I had hoped to use the [smx0/obs-text-wrapper](https://github.com/smx0/obs-text-wrapper) plugin for this, but it had a few limimation (most notably it adds the whole tag content to the closing tag, which breaks the HTML rendering.)

To be honest, most of this was created by Grok with a few careful prompts.  But I've tested and and am using it.  Feel free to contribute.

## Installation
- Open Obsidian and go to Settings > Community Plugins.
- Disable Safe Mode if it's enabled.
- Click "Browse" and search for "Tag Wrapper".
- Click "Install" and then "Enable".
- For manual installation:

### (or if you are the adventerous sort)
- Download the latest release from the GitHub repository.
- Extract the files into your Obsidian vault's .obsidian/plugins/ directory.
- Enable the plugin in Settings > Community Plugins.

## Usage

### Configuring Tags
1. Open Settings in Obsidian.
2. Go to the "Tag Wrapper" section under Plugin Settings.
3. Enter your desired opening tags in the provided fields. For example:

  - Tag One: <span class="highlight">
  - Tag Two: <b>
  - Tag Three: <i>

4. Save the settings.

*Note: After changing tags, you may need to reload the plugin or restart Obsidian for the changes to take effect in the command palette.*

### Wrapping Text

1. Select the text you want to wrap in the editor.
2. Open the command palette (Ctrl/Cmd + P).
3. Search for "Wrap with [your tag]" (e.g., "Wrap with <span class="highlight">").
4. Select the command to wrap the text.

#### Alternatively, assign custom keyboard shortcuts:

1. Go to Settings > Hotkeys.
2. Search for the command names (e.g., "Wrap with <span class="highlight">").
3. Assign your desired hotkeys.

The plugin automatically adds a closing tag without attributes. For example, if you wrap with <span class="highlight">, the closing tag will be </span>.

### Limitations

1. Command names in the palette are set when the plugin loads. After changing tags, reload the plugin or restart Obsidian to update them.
2. Keyboard shortcuts must be assigned manually in Obsidian's Hotkeys settings.

## How It Works

The plugin registers commands for each configured tag. When a command is invoked, it:

1. Parses the opening tag to extract the tag name and attributes.
2. Wraps the selected text with the full opening tag and a closing tag (using only the tag name).

Example:

- Opening tag: <span class="highlight">
- Closing tag: </span>

This ensures properly formatted HTML output.

## Contributing

To contribute to this plugin, visit the GitHub repository and submit a pull request.

## License
This plugin is licensed under the MIT License.

