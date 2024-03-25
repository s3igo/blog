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
title: {{ inputs.value | kebab }}
tags: []
published: {{ date "YYYY-MM-DD" }}
updated:
draft: true
---

```
