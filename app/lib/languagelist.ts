import { cpp } from '@codemirror/lang-cpp'
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"

export const languages = [
  { name: 'C++', func: cpp },
  { name: 'JavaScript', func: javascript },
  { name: 'Java', func: java },
  { name: 'Python', func: python }
]