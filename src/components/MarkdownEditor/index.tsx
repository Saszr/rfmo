import React from 'react';
import classNames from 'classnames';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

import Tabs from '@/components/Tabs';

import Styles from './MarkdownEditor.module.less';
import './github-markdown.css';
import './github-highlight.css';

const md: markdownIt = new markdownIt({
  highlight: (code, language) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return (
          `<pre><code class="hljs language-${language}">` +
          hljs.highlight(code, { language }).value +
          '</code></pre>'
        );
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + '</code></pre>';
  },
});

const MarkdownPreview = ({ doc, className }: { doc: string; className?: string }) => {
  const [htmlString, setHtmlString] = React.useState('');

  React.useEffect(() => {
    if (doc) setHtmlString(md.render(doc));
  }, [doc]);

  return (
    <div
      className={classNames('markdown-body', className)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

interface EditorProps {
  initDoc?: string;
  extraArea?: React.ReactNode;
  extraBtn?: React.ReactNode;
  onChange?: (value: string) => void;
}

const MarkdownEditor = (props: EditorProps) => {
  const { initDoc, extraBtn, onChange, extraArea } = props;

  const [doc, setDoc] = React.useState('');
  const [editorTextareaRef, setEditorTextareaRef] = React.useState<HTMLTextAreaElement | null>(
    null,
  );

  const handleEditorChange = () => {
    if (editorTextareaRef) {
      if (onChange) onChange(editorTextareaRef.value);
    }
  };

  React.useEffect(() => {
    if (typeof initDoc !== 'undefined') {
      setDoc(initDoc);
    }
  }, [initDoc]);

  React.useEffect(() => {
    if (editorTextareaRef) {
      editorTextareaRef.style.height = 'auto';
      editorTextareaRef.style.height = editorTextareaRef.scrollHeight + 'px';
    }
  }, [doc]);

  React.useEffect(() => {
    if (editorTextareaRef) {
      editorTextareaRef.style.height = 'auto';
      editorTextareaRef.style.height = editorTextareaRef.scrollHeight + 'px';
    }
  }, [editorTextareaRef]);

  return (
    <div className={Styles.container}>
      <Tabs defaultActiveKey="1" renderAllTabPanes>
        <Tabs.TabPane tab="Write" key="1">
          <div className={Styles['editor-container']}>
            <textarea
              ref={(ref) => setEditorTextareaRef(ref)}
              className={Styles.editor}
              onChange={() => handleEditorChange()}
              value={doc}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preview" key="2">
          <MarkdownPreview className={Styles.preview} doc={doc} />
        </Tabs.TabPane>
      </Tabs>

      <div className={Styles.footer}>
        <div className={Styles.extraArea}>{extraArea}</div>
        <div className={Styles.extraBtn}>{extraBtn}</div>
      </div>
    </div>
  );
};

export { MarkdownPreview };

export default MarkdownEditor;
