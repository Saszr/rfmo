import React from 'react';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { useMemoizedFn } from 'ahooks';

import MarkdownEditor from '@/components/MarkdownEditor';
import { db } from '@/store/db';

interface EditorExtraBtnProps {
  editorVal: string;
  onClick?: (params: Record<string, any> | string | undefined) => void;
  title?: string;
  handleDocClean?: () => void;
}

const EditorExtraBtnSubmit = (props: EditorExtraBtnProps) => {
  const { editorVal, onClick, handleDocClean } = props;

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    if (editorVal.length > 0) {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
  }, [editorVal]);

  const handleClick = async () => {
    const node_id = await db.memo.add({
      node_id: nanoid(),
      body: editorVal,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    const res = await db.memo.get(node_id);

    if (handleDocClean) {
      handleDocClean();
    }

    if (onClick) onClick(res);
  };

  return (
    <button type="button" onClick={handleClick} disabled={submitBtnDisabled}>
      发送
    </button>
  );
};

const EditorExtraBtn = (props: EditorExtraBtnProps) => {
  const { editorVal, onClick, title } = props;

  const handleClick = () => {
    if (onClick) onClick(editorVal);
  };

  return (
    <button type="button" onClick={handleClick}>
      {title}
    </button>
  );
};

interface EditorProps {
  initDoc?: string;
  extraBtnArr: Record<string, (params: Record<string, any> | string | undefined) => void>;
}

const Editor = (props: EditorProps) => {
  const { extraBtnArr, initDoc } = props;

  const [editorVal, setEditorVal] = React.useState('');

  const initEditor = useMemoizedFn(() => {
    if (initDoc) {
      setEditorVal(initDoc);
    }
  });

  React.useEffect(() => {
    initEditor();
  }, [initEditor]);

  const handleChange = (value: string) => {
    setEditorVal(value);
  };

  const handleDocClean = () => {
    setEditorVal('');
  };

  const extraBtn: Record<string, React.ReactNode> = {
    submit: (
      <EditorExtraBtnSubmit
        key="submit"
        editorVal={editorVal}
        handleDocClean={handleDocClean}
        onClick={extraBtnArr.submit}
      />
    ),
    update: (
      <EditorExtraBtn
        key="update"
        title="更新"
        editorVal={editorVal}
        onClick={extraBtnArr.update}
      />
    ),
    cancel: (
      <EditorExtraBtn
        key="cancel"
        title="取消"
        editorVal={editorVal}
        onClick={extraBtnArr.cancel}
      />
    ),
  };

  return (
    <MarkdownEditor
      initDoc={editorVal}
      onChange={handleChange}
      extraBtn={
        <>
          {Object.keys(extraBtnArr).map((item) => {
            return extraBtn[item];
          })}
        </>
      }
    />
  );
};

export default Editor;
