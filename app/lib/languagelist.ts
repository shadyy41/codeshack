import { cpp } from '@codemirror/lang-cpp'
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"

export const languages = [
  { name: 'C++', func: cpp, value: "cpp" },
  { name: 'JavaScript', func: javascript, value: "javascript" },
  { name: 'Java', func: java, value: "java" },
  { name: 'Python', func: python, value: "python" }
]