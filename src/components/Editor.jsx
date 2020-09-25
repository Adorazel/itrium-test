import React from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-jsx"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/snippets/json"
import "ace-builds/src-noconflict/theme-github"

const Editor = ({value, onChange, readOnly}) => {

  const onFocus = event => {
    const $editor = event.path[1]
    $editor.classList.add("focus")
  }

  const onBlur = event => {
    const $editor = event.path[1]
    $editor.classList.remove("focus")
  }

  return <AceEditor
    value={value}
    onChange={onChange}
    readOnly={!!readOnly}
    onFocus={onFocus}
    onBlur={onBlur}
    mode="json"
    theme="github"
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    fontSize={14}
    width={"100%"}
    height={"300px"}
    className="border rounded"
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
    }}/>
}

export default Editor