import React, { Component } from 'react';

class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };

    this.selection = window.getSelection();

    this.handleClickToEditable = this.handleClickToEditable.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleCopyAllText = this.handleCopyAllText.bind(this);
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
    this.handleShowMessage = this.handleShowMessage.bind(this);
    this.writeTotext = this.writeTotext.bind(this);
  }

  componentDidMount() {
    document.addEventListener('selectionchange', this.handleChangeSelection);
    this.content.addEventListener('paste', this.writeTotext);
    this.content.addEventListener('drop', e => e.preventDefault());
    this.handleEmitCallback();
  }

  handleShowMessage(e) {
    if (/wr-mark-\d+/.test(e.target.id)) {
      alert('success');
    }
  }

  handleEmitCallback(e) {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const id = mutation.removedNodes[0] && mutation.removedNodes[0].firstElementChild && mutation.removedNodes[0].firstElementChild.id;
          const text = mutation.removedNodes[0] && mutation.removedNodes[0].lastElementChild && mutation.removedNodes[0].lastElementChild.innerText;
          const editType = mutation.removedNodes[0] ? 'remove' : 'default';
          this.props.cb(id, text, editType);
        }
      });
    });

    observer.observe(this.content, {childList: true, subtree: true});
  }

  handleChangeSelection() {
    document.removeEventListener('selectionchange', this.handleChangeSelection);
    let anchorNode = this.selection && this.selection.anchorNode && this.selection.anchorNode.parentElement;
    if (anchorNode && anchorNode.parentElement.className === 'mark') {
      this.selection.collapse(anchorNode.parentElement, 2);
      this.selection.extend(anchorNode.parentElement, 0);
    }

    setTimeout(() => {
      document.addEventListener('selectionchange', this.handleChangeSelection);
    }, 0);
  }

  // 只能写入text格式
  writeTotext(e) {
    e.preventDefault();
    console.log(e);
    const text = e.clipboardData.getData("text/plain");
    // TODO: 过滤标记序号
    const formatText = text.replace(/\d+/g, '');
    document.execCommand("insertHTML", false, formatText);
  }

  handleCopyAllText() {
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  handleCopy() {
    document.execCommand('copy');
  }

  handleCut() {
    document.execCommand('cut');
  }

  handleUndo() {
    document.execCommand('undo');
  }

  handleClickToEditable() {
    this.setState({ isEdit: true });
  }

  render() {
    // TODO: suppressContentEditableWarning 忽略警告，因为contentEditable脱离了react控制
    const { html } = this.props;
    const { isEdit } = this.state;
    return (
      <div>
        <div className='controls'>
          <button onClick={this.handleCopyAllText}>复制全文</button>
          <button onClick={this.handleCopy}>copy</button>
          <button onClick={this.handleCut}>cut</button>
          <button onClick={this.handleUndo}>undo</button>
        </div>
        <div
          className='wrap'
          contentEditable={isEdit}
          ref={c => this.content = c}
          onClick={this.handleClickToEditable}
          suppressContentEditableWarning={true}
        >
          <div
            onClick={this.handleShowMessage}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    )
  }
}

export default Report;
