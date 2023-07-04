import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

/* Reference for tags => https://github.com/lezer-parser/cpp/blob/main/src/highlight.js */

const myThemeEditor = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#0a0a0a",
    height: "100%",
    width: "100%",
    display: "block",
    fontSize: "1rem"
  },
  ".cm-content": {
    fontFamily: "monospace"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#FFFFFF",
    borderWidth: "1.5px",
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFFFFF'
  },
  "&.cm-editor.cm-focused": {
    outline: "none"
  },
  "&.cm-focused .cm-matchingBracket": {
    backgroundColor: "#343434",
    outline: "1px solid #343434"
  },
  ".cm-selectionMatch": {
    backgroundColor: "#343434",
    outline: "2px solid #343434"
  },
  ".cm-activeLine":{
    backgroundColor: "#343434"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#0088fa45",
  },
  ".cm-gutters": {
    backgroundColor: "#0a0a0a",
    color: "#757575",
  }
}, {dark: true})

const myHighlight = /*@__PURE__*/HighlightStyle.define([
  { tag: tags.keyword, color: "#FFFFFF" },
  { tag: [tags.standard(tags.typeName), tags.definitionKeyword, tags.controlKeyword, tags.modifier, tags.processingInstruction], color: "#77b7d7" },
  { tag: [tags.operator, tags.compareOperator, tags.arithmeticOperator, tags.operatorKeyword, tags.bitwiseOperator], color: "#77b7d7" },
  { tag: [tags.string], color: "#977cdc" },
  { tag: [tags.number], color: "#d96964" },
  { tag: [tags.self], color: "#dfab5c" },/* this */
  { tag: [tags.comment], color: "#757575", fontStyle: 'italic'},
  { tag: [tags.bool, tags.null], color: "#fbcc43"},
  { tag: [tags.function(tags.definition(tags.variableName))], color: "#86d9ca"},
  { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: "#86d9ca" }, /* function name */
])

const myTheme = [
  myThemeEditor,
  syntaxHighlighting(myHighlight)
]

export { myTheme }