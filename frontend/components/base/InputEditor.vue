<template>
	<div>
		<div
			v-if="editor"
			class="mb-1">
			<base-btn
				v-for="option in options"
				:key="option.label"
				:disabled="option.disabled"
				:rounded="true"
				small
				outlined
				class="ma-1"
				@click="option.action">
				{{ option.label }}
			</base-btn>
		</div>

		<editor-content :editor="editor" />
	</div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import BaseBtn from "~/components/base/BaseBtn.vue";

export default {
	components: { EditorContent, BaseBtn },
	props: {
		value: {
			type: [String, Number],
			default: null
		},
		label: {
			type: String,
			default: null
		},
		hint: {
			type: String,
			default: "Write something..."
		}
	},
	emits: ["input"],
	data() {
		return {
			editor: null,
			content: null
		};
	},
	computed: {
		options(){
			return [
				{
					label: "bold",
					class: { "is-active": this.editor.isActive("bold") },
					disabled: !this.editor.can().chain().focus().toggleBold().run(),
					action: () => { this.editor.chain().focus().toggleBold().run(); }
				},
				{
					label: "italic",
					class: { "is-active": this.editor.isActive("italic") },
					disabled: !this.editor.can().chain().focus().toggleItalic().run(),
					action: () => { this.editor.chain().focus().toggleItalic().run(); }
				},
				{
					label: "paragraph",
					class: { "is-active": this.editor.isActive("paragraph") },
					disabled: false,
					action: () => { this.editor.chain().focus().setParagraph().run(); }
				},
				{
					label: "h1",
					class: { "is-active": this.editor.isActive("heading", { level: 1 }) },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleHeading({ level: 1 }).run(); }
				},
				{
					label: "h2",
					class: { "is-active": this.editor.isActive("heading", { level: 2 }) },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleHeading({ level: 2 }).run(); }
				},
				{
					label: "h4",
					class: { "is-active": this.editor.isActive("heading", { level: 4 }) },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleHeading({ level: 4 }).run(); }
				},
				{
					label: "bullet list",
					class: { "is-active": this.editor.isActive("bulletList") },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleBulletList().run(); }
				},
				{
					label: "ordered list",
					class: { "is-active": this.editor.isActive("orderedList") },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleOrderedList().run(); }
				},
				{
					label: "blockquote",
					class: { "is-active": this.editor.isActive("blockquote") },
					disabled: false,
					action: () => { this.editor.chain().focus().toggleBlockquote().run(); }
				}
			];
		}
	},
	mounted() {
		this.editor = new Editor({
			content: this.value,
			extensions: [
				StarterKit
			]
		});
	},
	beforeUnmount() {
		this.editor.destroy();
	}
};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
	padding: 0.5rem;
	border-radius: 2px;
	border: 1px solid #ccc;

	text-transform: none;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>
