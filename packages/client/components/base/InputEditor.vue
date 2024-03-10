<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
  },
  placeHolder: {
    type: String,
    default: 'Write something …'
  },
  value: {
    type: String,
    default: ''
  },
})

const form = ref<string>(props.value)

const editor = useEditor({
  content: props.value.length > 0 ? props.value : undefined,
  extensions: [
    StarterKit,
    Placeholder.configure({
      // Use a placeholder:
      placeholder: props.placeHolder,
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }

      //   return 'Can you add some further context?'
      // },
    })
  ],
  // watch for changes to editor content and update the form value
  onUpdate: () => {
    // HTML
    form.value = editor.value!.getHTML()

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  }
})

interface EditOption {
  // name
  name: string
  // function to run when the button is clicked
  action: () => void
  // whether the button is disabled or not
  disabled: boolean
  // whether the button is active or not
  active: boolean
}

// edit options (i.e. bold, italic, etc.)
const editOptions = computed<EditOption[]>(() => {
  return [
    {
      name: 'bold',
      action: () => editor.value!.chain().focus().toggleBold().run(),
      disabled: !editor.value!.can().chain().focus().toggleBold().run(),
      active: editor.value!.isActive('bold'),
    },
    {
      name: 'italic',
      action: () => editor.value!.chain().focus().toggleItalic().run(),
      disabled: !editor.value!.can().chain().focus().toggleItalic().run(),
      active: editor.value!.isActive('italic'),
    },
    {
      name: 'strike',
      action: () => editor.value!.chain().focus().toggleStrike().run(),
      disabled: !editor.value!.can().chain().focus().toggleStrike().run(),
      active: editor.value!.isActive('strike'),
    },
    {
      name: 'code',
      action: () => editor.value!.chain().focus().toggleCode().run(),
      disabled: !editor.value!.can().chain().focus().toggleCode().run(),
      active: editor.value!.isActive('code'),
    },
    {
      name: 'clear marks',
      action: () => editor.value!.chain().focus().unsetAllMarks().run(),
      disabled: false,
      active: false,
    },
    {
      name: 'clear nodes',
      action: () => editor.value!.chain().focus().clearNodes().run(),
      disabled: false,
      active: false,
    },
    {
      name: 'paragraph',
      action: () => editor.value!.chain().focus().setParagraph().run(),
      disabled: false,
      active: editor.value!.isActive('paragraph'),
    },
    {
      name: 'h1',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 1 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 1 }),
    },
    {
      name: 'h2',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 2 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 2 }),
    },
    {
      name: 'h3',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 3 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 3 }),
    },
    {
      name: 'h4',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 4 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 4 }),
    },
    {
      name: 'h5',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 5 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 5 }),
    },
    {
      name: 'h6',
      action: () => editor.value!.chain().focus().toggleHeading({ level: 6 }).run(),
      disabled: false,
      active: editor.value!.isActive('heading', { level: 6 }),
    },
    {
      name: 'bullet list',
      action: () => editor.value!.chain().focus().toggleBulletList().run(),
      disabled: false,
      active: editor.value!.isActive('bulletList'),
    },
    {
      name: 'ordered list',
      action: () => editor.value!.chain().focus().toggleOrderedList().run(),
      disabled: false,
      active: editor.value!.isActive('orderedList'),
    },
    {
      name: 'code block',
      action: () => editor.value!.chain().focus().toggleCodeBlock().run(),
      disabled: false,
      active: editor.value!.isActive('codeBlock'),
    },
    {
      name: 'blockquote',
      action: () => editor.value!.chain().focus().toggleBlockquote().run(),
      disabled: false,
      active: editor.value!.isActive('blockquote'),
    },
    {
      name: 'horizontal rule',
      action: () => editor.value!.chain().focus().setHorizontalRule().run(),
      disabled: false,
      active: false,
    }
  ]
})

//watch for changes to the prop value and update the editor
watch(() => props.value, (value) => {
  // HTML
  const isSame = editor.value!.getHTML() === value

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame) {
    return
  }

  editor.value!.commands.setContent(value, false)
})

// watch for changes to the form value and emit an update event
watch(() => form.value, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div v-if="editor">
    <base-btn v-for="option in editOptions" :key="option.name" :class="{ 'is-active': option.active, 'ma-1': true }" small
      :disabled="option.disabled" @click="option.action">
      {{ option.name }}
    </base-btn>
  </div>
  <v-sheet class="mt-2 pa-2" color="white darken-2" rounded="lg">
    <editor-content id="input-editor" class="ma-2" :editor="editor" />
  </v-sheet>
</template>

<style>
#input-editor {
  min-height: 200px;
}

/* remove blue outline on editor when focused */
.ProseMirror-focused {
  outline: none;
}
</style>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  >*+* {
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