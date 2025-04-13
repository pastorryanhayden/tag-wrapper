import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface TagWrapperSettings {
    tagOne: string;
    tagTwo: string;
    tagThree: string;
}

const DEFAULT_SETTINGS: TagWrapperSettings = {
    tagOne: '',
    tagTwo: '',
    tagThree: ''
}

export default class TagWrapperPlugin extends Plugin {
    settings: TagWrapperSettings;

    async onload() {
        await this.loadSettings();

        // Add commands for each tag if it’s defined
        if (this.settings.tagOne) {
            this.addCommand({
                id: 'wrap-with-tag-one',
                name: `Wrap with ${this.settings.tagOne}`,
                editorCallback: (editor: Editor, view: MarkdownView) => {
                    this.wrapWithTag(editor, this.settings.tagOne);
                }
            });
        }
        if (this.settings.tagTwo) {
            this.addCommand({
                id: 'wrap-with-tag-two',
                name: `Wrap with ${this.settings.tagTwo}`,
                editorCallback: (editor: Editor, view: MarkdownView) => {
                    this.wrapWithTag(editor, this.settings.tagTwo);
                }
            });
        }
        if (this.settings.tagThree) {
            this.addCommand({
                id: 'wrap-with-tag-three',
                name: `Wrap with ${this.settings.tagThree}`,
                editorCallback: (editor: Editor, view: MarkdownView) => {
                    this.wrapWithTag(editor, this.settings.tagThree);
                }
            });
        }

        // Add settings tab
        this.addSettingTab(new TagWrapperSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    parseTag(fullTag: string): { tagName: string, fullTag: string } {
        const trimmed = fullTag.trim();
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
            const inner = trimmed.slice(1, -1).trim();
            const spaceIndex = inner.indexOf(' ');
            const tagName = spaceIndex === -1 ? inner : inner.substring(0, spaceIndex);
            return { tagName, fullTag: trimmed };
        }
        return { tagName: '', fullTag: '' };
    }

    wrapWithTag(editor: Editor, tag: string) {
        const selection = editor.getSelection();
        const { tagName, fullTag } = this.parseTag(tag);
        if (tagName && fullTag) {
            editor.replaceSelection(`${fullTag}${selection}</${tagName}>`);
        } else {
            new Notice(`Invalid tag: ${tag}`);
        }
    }
}

class TagWrapperSettingTab extends PluginSettingTab {
    plugin: TagWrapperPlugin;

    constructor(app: App, plugin: TagWrapperPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Tag Wrapper Settings' });

        new Setting(containerEl)
            .setName('Tag One')
            .setDesc('Enter the opening tag (e.g., <span class="blank">)')
            .addText(text => text
                .setPlaceholder('e.g., <span class="blank">')
                .setValue(this.plugin.settings.tagOne)
                .onChange(async (value) => {
                    this.plugin.settings.tagOne = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Tag Two')
            .setDesc('Enter the opening tag (e.g., <span class="read_text">)')
            .addText(text => text
                .setPlaceholder('e.g., <span class="read_text">')
                .setValue(this.plugin.settings.tagTwo)
                .onChange(async (value) => {
                    this.plugin.settings.tagTwo = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Tag Three')
            .setDesc('Enter the opening tag (e.g., <div class="hide">)')
            .addText(text => text
                .setPlaceholder('e.g., <div class="hide">')
                .setValue(this.plugin.settings.tagThree)
                .onChange(async (value) => {
                    this.plugin.settings.tagThree = value;
                    await this.plugin.saveSettings();
                }));

        containerEl.createEl('p', { text: 'Note: After changing tags, reload the plugin or restart Obsidian to update command names in the palette.' });

        // Instructions for setting hotkeys
        containerEl.createEl('h3', { text: 'Custom Hotkeys' });
        containerEl.createEl('p', { text: 'To set custom hotkeys for each tag:' });
        containerEl.createEl('ol').innerHTML = `
            <li>Save your tags above and reload the plugin or restart Obsidian.</li>
            <li>Go to <strong>Settings > Hotkeys</strong>.</li>
            <li>Search for the command names (e.g., "Wrap with &lt;span class=&quot;blank&quot;&gt;").</li>
            <li>Assign your desired hotkeys to each command.</li>
        `;
    }
}
