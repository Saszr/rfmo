import React from 'react';
import ReactDOM from 'react-dom';
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
  extraBtn?: React.ReactNode;
  onChange?: (value: string) => void;
}

const MarkdownEditor = (props: EditorProps) => {
  const { initDoc, extraBtn, onChange } = props;

  const editorTextarea = React.useRef<HTMLTextAreaElement>(null);
  const [doc, setDoc] = React.useState('');
  const [textareaInitHeight, setTextareaInitHeight] = React.useState('auto');

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDoc(e.target.value);

    const textarea = editorTextarea.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      if (onChange) onChange(textarea.value);
    }
  };

  React.useEffect(() => {
    if (initDoc) {
      setDoc(initDoc);

      const tempTextarea = document.createElement('textarea');
      tempTextarea.innerHTML = initDoc;
      document.body.append(tempTextarea);
      const height = `${tempTextarea.scrollHeight}px`;
      setTextareaInitHeight(height);
      document.body.removeChild(tempTextarea);
    }
  }, [initDoc]);

  return (
    <div className={Styles.container}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Write" key="1">
          <div className={Styles['editor-container']}>
            <textarea
              ref={editorTextarea}
              className={Styles.editor}
              onChange={(e) => handleEditorChange(e)}
              style={{ height: textareaInitHeight }}
              defaultValue={initDoc}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preview" key="2">
          <MarkdownPreview className={Styles.preview} doc={doc} />
        </Tabs.TabPane>
      </Tabs>

      <div className={Styles.footer}>{extraBtn}</div>
    </div>
  );
};

export { MarkdownPreview };

export default MarkdownEditor;
