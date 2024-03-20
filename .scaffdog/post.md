---
name: 'new post'
root: './src/content/posts/'
output: '*'
ignore: []
questions:
  value: 'Post name:'
---

# `{{ inputs.value | kebab }}.md`

```md
---
title:
published:
updated:
tags: []
---

```
