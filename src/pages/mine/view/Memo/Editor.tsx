import React from 'react';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { useMemoizedFn } from 'ahooks';
import { BiPlus } from 'react-icons/bi';
import { isNull } from 'lodash-es';

import MarkdownEditor from '@/components/MarkdownEditor';
import Tag from '@/components/Tag';
import Input from '@/components/Input';
import { db } from '@/store/db';

interface EditorExtraBtnProps {
  editorVal: string;
  editorTags?: TagItem[];
  onClick?: (params: Record<string, any> | string | undefined) => void;
  title?: string;
  setEditorVal?: React.Dispatch<React.SetStateAction<string>>;
  setEditorTags?: React.Dispatch<React.SetStateAction<TagItem[]>>;
}

const EditorExtraBtnSubmit = (props: EditorExtraBtnProps) => {
  const { editorVal, editorTags, onClick, setEditorVal, setEditorTags } = props;

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
      tags: editorTags as TagItem[],
    });

    const res = await db.memo.get(node_id);

    if (setEditorVal) setEditorVal('');
    if (setEditorTags) setEditorTags([]);

    if (onClick) onClick(res);
  };

  return (
    <button type="button" onClick={handleClick} disabled={submitBtnDisabled}>
      发送
    </button>
  );
};

const EditorExtraBtn = (props: EditorExtraBtnProps) => {
  const { editorVal, editorTags, onClick, title } = props;

  const handleClick = () => {
    if (onClick) onClick({ editorVal, editorTags });
  };

  return (
    <button type="button" onClick={handleClick}>
      {title}
    </button>
  );
};

export interface TagItem {
  key: string;
  value: string;
}

interface EditorTagsAreaProps {
  editorTags: TagItem[];
  setEditorTags: React.Dispatch<React.SetStateAction<TagItem[]>>;
}

const EditorTagsArea = (props: EditorTagsAreaProps) => {
  const { editorTags, setEditorTags } = props;

  const [tagInputVisible, setTagInputVisible] = React.useState(false);
  const [tags, setTags] = React.useState<TagItem[]>([]);
  const [tagInputRef, setTagInputRef] = React.useState<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setTags(editorTags);
  }, [editorTags]);

  React.useEffect(() => {
    if (!isNull(tagInputRef)) {
      tagInputRef?.focus();
    }
  }, [tagInputRef]);

  const handleInputConfirm = (
    e: React.FocusEvent<HTMLInputElement, Element> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const curVal = (e.target as HTMLInputElement).value;

    setTagInputVisible(false);

    if (curVal.length === 0) return;

    const curTagItem = {
      key: nanoid(),
      value: curVal,
    };

    // const curTagItems = [...tags, curTagItem];
    const curTagItems = [curTagItem];

    setTags(curTagItems);
    setEditorTags(curTagItems);
  };

  const showTagInput = () => {
    setTagInputVisible(true);
  };

  const handleTagClose = (item: TagItem) => {
    const newTags = editorTags.filter(({ key }) => key !== item.key);
    setEditorTags(newTags);
  };

  return (
    <div>
      {tagInputVisible ? (
        <Input
          ref={(ref) => {
            setTagInputRef(ref);
          }}
          type="text"
          maxLength={5}
          style={{ width: '76px', marginRight: '8px' }}
          onPressEnter={handleInputConfirm}
          onBlur={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showTagInput}>
          <span style={{ verticalAlign: '-.125em', lineHeight: '0' }}>
            <BiPlus />
          </span>
        </Tag>
      )}

      {tags?.map((item) => {
        return (
          <Tag key={item.key} closable onClose={() => handleTagClose(item)}>
            {item.value}
          </Tag>
        );
      })}
    </div>
  );
};

interface EditorProps {
  initDoc?: string;
  initTags?: {
    key: string;
    value: string;
  }[];
  extraBtnArr: Record<string, (params: Record<string, any> | string | undefined) => void>;
}

const Editor = (props: EditorProps) => {
  const { extraBtnArr, initDoc, initTags } = props;

  const [editorVal, setEditorVal] = React.useState('');
  const [editorTags, setEditorTags] = React.useState<TagItem[]>(initTags ? initTags : []);

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

  const extraBtn: Record<string, React.ReactNode> = {
    submit: (
      <EditorExtraBtnSubmit
        key="submit"
        editorVal={editorVal}
        setEditorVal={setEditorVal}
        editorTags={editorTags}
        setEditorTags={setEditorTags}
        onClick={extraBtnArr.submit}
      />
    ),
    update: (
      <EditorExtraBtn
        key="update"
        title="更新"
        editorVal={editorVal}
        editorTags={editorTags}
        onClick={extraBtnArr.update}
      />
    ),
    cancel: (
      <EditorExtraBtn
        key="cancel"
        title="取消"
        editorVal={editorVal}
        editorTags={editorTags}
        onClick={extraBtnArr.cancel}
      />
    ),
  };

  return (
    <MarkdownEditor
      initDoc={editorVal}
      onChange={handleChange}
      extraArea={<EditorTagsArea editorTags={editorTags} setEditorTags={setEditorTags} />}
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
