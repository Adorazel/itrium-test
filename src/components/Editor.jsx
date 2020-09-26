import React, {useRef} from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-jsx"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/snippets/json"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/snippets/html"
import "ace-builds/src-noconflict/theme-github"

const noop = () => {}

const Editor = ({name, value, onChange = noop, readOnly, mode}) => {

  const editor = useRef()

  const onFocus = event => {
    const $editor = event.path[1]
    $editor.classList.add("focus")
  }

  const onBlur = event => {
    const $editor = event.path[1]
    $editor.classList.remove("focus")
  }

  return <AceEditor
    ref={editor}
    name={name}
    value={value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    readOnly={!!readOnly}
    mode={mode ? mode : "json"}
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