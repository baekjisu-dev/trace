import '@/components/post/styles.scss'

import { EditorContent, useEditor } from '@tiptap/react';
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import Code from '@tiptap/extension-code';
import Highlight from '@tiptap/extension-highlight';

const lowlight = createLowlight(all)

const extensions = [TextStyleKit, StarterKit, CodeBlockLowlight.configure({ lowlight }), Code, Highlight]

const PostEditor = () => {
  const editor = useEditor({
    extensions,
    content: '',
  });

  return (
    <div className="p-2.5 border-b">
      <EditorContent editor={editor} />
    </div>
  )
}

export default PostEditor;