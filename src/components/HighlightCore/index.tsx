import React, { useMemo, useState } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
  ContentBlock,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.css';
import { IProps } from 'components/WithAntdForm';

const styles: {
  handle: React.CSSProperties;
} = {
  handle: {
    color: 'red',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
    display: 'inline-block',
    textDecoration: 'underline',
  },
};

const HANDLE_REGEX = new RegExp(/[^\u4E00-\u9FA5]/g);

const handleStrategy = (contentBlock: ContentBlock, callback: Function) => {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
};

const findWithRegex = (
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: Function,
) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const HandleSpan = (props: any) => {
  return (
    <span style={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

interface IHighLightCoreProps extends IProps {}

const HighLightCore: React.FC<IHighLightCoreProps> = ({
  value = '',
  onChange,
}) => {
  const compositeDecorator = useMemo(() => {
    return new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
    ]);
  }, []);

  const [editorState, setEditorState] = useState(
    EditorState.push(
      EditorState.createEmpty(compositeDecorator),
      ContentState.createFromText(value || ''),
      'change-block-data',
    ),
  );

  const parseImmutableObject2string = () => {
    // @ts-ignore
    const textVal = Object.entries(editorState.toJS().currentContent.blockMap)
      .flat(Infinity)
      .filter((map) => typeof map !== 'string')
      .map((blockMap: any) => blockMap?.text)
      .join('');
    onChange?.(textVal);
  };

  const onEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);
    parseImmutableObject2string();
  };

  return (
    <div style={{ width: '100%', height: 200 }} className="container-root">
      <Editor
        editorState={editorState}
        onChange={onEditorChange}
        placeholder="Write..."
      />
    </div>
  );
};

export default HighLightCore;
