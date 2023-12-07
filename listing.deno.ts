#!/usr/bin/env -S deno run --allow-run --allow-write --allow-read
type Article = {
  path: string,
  title: string,
  created_at: Date,
  updated_at: Date | undefined,
  abstract: string,
  tags: string[]
}

const filesByte = new Deno.Command('ls').outputSync().stdout
const files = new TextDecoder().decode(filesByte).split('\n').filter(filename => filename.includes('.md'))
console.log(files)

const list: Article[] = []

files.forEach(file => {
  const articleByte = Deno.readFileSync(file)
  const articleInfo = JSON.parse(`{${new TextDecoder().decode(articleByte).match(/---\n[\s\S\n]+\n---/g)?.[0]?.replace(/\n*---\n*/g, '').replaceAll('\n', ',')}}`)
  articleInfo.created_at = new Date(articleInfo.created_at)
  articleInfo.updated_at = articleInfo.updated_at !== 'none' ? new Date(articleInfo.updated_at) : null
  articleInfo.tags = JSON.parse(`["${articleInfo.tags.replace(',', '","')}"]`)
  articleInfo.path = file
  console.log(articleInfo)
  list.push(articleInfo)
})

const sorted = list.sort((a, b) => Number(b.created_at) - Number(a.created_at))

Deno.writeFileSync('article-list.json', new TextEncoder().encode(JSON.stringify(sorted)))