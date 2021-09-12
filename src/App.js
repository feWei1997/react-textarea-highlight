import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.css';

const styles = {
  handle: {
    color: 'red',
    // backgroundColor: '#FF7F7F',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
    display: 'inline-block',
    textDecoration: 'underline',
    // background: 'linear-gradient(red, red) no-repeat',
    // background
  },
};

const HANDLE_REGEX = new RegExp(/[^\u4E00-\u9FA5]/g);

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
const HandleSpan = (props) => {
  return (
    <span style={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
    ]);
    this.state = {
      // editorState: EditorState.createEmpty(compositeDecorator),
      editorState: EditorState.push(
        EditorState.createEmpty(compositeDecorator),
        ContentState.createFromText(this.props?.value || ''),
      ),
    };

    this.parseImmutableObject2string = () => {
      const textVal = Object.entries(
        this.state.editorState.toJS().currentContent.blockMap,
      )
        .flat(Infinity)
        .filter((map) => typeof map !== 'string')
        .map((blockMap) => blockMap?.text)
        .join('');
      this.props?.onChange(textVal);
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.parseImmutableObject2string();
    };
  }
  render() {
    console.log(this.state.editorState);

    return (
      <div style={{ width: '100%', height: 200 }} className="container-root">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Write..."
          ref="editor"
        />
      </div>
    );
  }
}

export default App;
