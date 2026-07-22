---
title: 'Let us create a Markdown substitution structure'
description: 'Using the GitHub Markdown API and a substitution structure, we can create an extensible static blog environment like MDX, and apply custom components through Markdown preprocessing with a substitution structure and regular expressions.'
created: '2024-10-26'
updated: '2026-04-03'
categories:
  - 'markdown'
  - 'javascript'
references: []
---

This blog is designed so that the 'GitHub Flavored Markdown syntax<sup>GFM, GitHub Flavored Markdown</sup>' used by GitHub can be used as-is in Markdown documents for blog posts.

To do this, it does not use Markdown parsers<sup>Parser</sup> such as [`markdown-it`](https://www.npmjs.com/package/markdown-it) or [`remark`](https://www.npmjs.com/package/remark), but uses GitHub's<sup>GitHub</sup> [Markdown API](https://docs.github.com/ko/rest/markdown/markdown?apiVersion=2022-11-28).

Packages like the ones above are faithful to the purpose of converting Markdown to HTML, but they do not return an HTML structure that is exactly compatible with GitHub Markdown syntax. (This is also true when using GFM plugins<sup>Plugin</sup> such as [`remark-gfm`](https://www.npmjs.com/package/remark-gfm). Compared with the GitHub Markdown API, compatibility is somewhat lower.)

The reason we need to receive the exact HTML structure officially used in GitHub Markdown is to use the [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css) package. This package is a CSS package that builds the same UI as GitHub Markdown. If differences occur in the `class` values and similar parts of the HTML when Markdown is converted to HTML, [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css) cannot render the HTML and CSS accurately. This eventually creates a difference between the Markdown UI on GitHub and the Markdown UI on the blog. Even if the result were not what I wanted, I could dress it up in its own way and use it, but that is not the intended result.

Of course, [MDX](https://mdxjs.com) could be used. Most SSG<sup>Static Site Generation</sup>-based blogs probably use MDX a lot. That is true in the [ko.react.dev](https://github.com/reactjs/ko.react.dev) repository where I currently serve as a maintainer, and it is also true in the official [Next.js](https://github.com/vercel/next.js/tree/canary/docs) documentation. MDX is used very often.

Because of this, at first I thought a lot about whether to use MDX. Since I am familiar with the React<sup>React</sup> ecosystem, MDX was very attractive because it can make better use of React components and has good extensibility.

The decision I made after thinking it through was to use the GitHub Markdown API to convert Markdown directly into HTML and then use it. The biggest reason was that the syntax was familiar because I used it often, and these days I live on GitHub all day, so I am very used to GitHub Markdown syntax.

However, the biggest drawback of using the GitHub Markdown API is that it lacks extensibility. MDX uses React<sup>React</sup> components, so its extensibility is excellent. Then is there a way to use the GitHub Markdown API while still making extensibility excellent like MDX? The concept that came to mind here is a 'Markdown substitution' structure. (Of course, this is not an official concept; it is a concept frequently used in many places that I also applied to developing my blog.)

For this, it is important to understand the series of flows by which the current blog converts Markdown documents to HTML and then converts them to JSX components. (When I made this blog, I paid a lot of attention to the code structure, so the actual logic is much larger. Therefore, I will cover only the essential parts here.)

## 1. Until Markdown Is Converted to JSX

If we list the series of steps for converting a Markdown document to JSX, they are as follows.

1. Read the Markdown file in `utf-8` format.<sup>"Step 1"</sup>
1. Send a POST request to the GitHub Markdown API and convert the Markdown file into an HTML string.<sup>"Step 2"</sup>
1. Use the [`html-react-parser`](https://github.com/remarkablemark/html-react-parser) package to convert the HTML string returned through the GitHub Markdown API into JSX.<sup>"Step 3"</sup>

It goes through the sequence above. However, the problem here is how to apply the custom components I need.

If we think about it briefly, we can consider about three methods for applying custom components.

1. Create a substitution structure in the Markdown document, and between "Step 1" and "Step 2", change the substitutions that exist inside the Markdown document in string form into the form I want.
1. Between "Step 2" and "Step 3", use a package such as [`cheerio`](https://www.npmjs.com/package/cheerio) to manipulate the HTML string into the structure I want, then pass it as an argument to [`html-react-parser`](https://github.com/remarkablemark/html-react-parser).
1. Use `replace`, a feature provided by `html-react-parser` in "Step 3", to convert a specific HTML tag<sup>Tag</sup> into the React<sup>React</sup> component I want.

The current blog development does not use all of the methods above, but they are methods I have handled at least once while developing other packages in the past. There is no need to insist on only one of these methods, and each has advantages and disadvantages, so it is good to use the one that fits the situation.

In this article, we will cover the 'substitution' structure among these.

## 2. Let Us Use Substitutions

### 2-1. What Is a Substitution?

Then what is a substitution? It is simple. If you have experience writing formulas with the `$ ... $` form in packages that support LaTex syntax, such as [MathJax](https://www.mathjax.org) and [KaTex](https://katex.org), then you have already used substitutions. Here, the substitution passes the content between `$` symbols to a specific function<sup>Function</sup> or module<sup>Module</sup>, converts it into a mathematical formula, and then uses it.

You can think of string interpolation<sup>String Interpolation</sup>, such as `${}` in JavaScript<sup>JavaScript</sup> template literals<sup>Template Literal</sup> and `#{}` in [SCSS](https://sass-lang.com), as a similar concept. (Of course, it is difficult to say that the concepts match exactly.)

Then if someone asks, "Is the structure that uses substitutions used often?", I can say, "It is used often." The various substitution structures I looked at to use the substitution structure of the current blog are as follows.

#### 2-1-1. MathJax and Katex

```md
**The Cauchy-Schwarz Inequality**
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

The following two kinds of substitutions determine inline<sup>Inline</sup> and block<sup>Block</sup> display<sup>Display</sup> formats respectively.

```txt
$ ... $
```

```txt
$$ ... $$
```

#### 2-1-2. Official [react.dev](https://github.com/reactjs/react.dev) Documentation

```md
## Using React for a part of your existing page {/*using-react-for-a-part-of-your-existing-page*/}

Let's say you have an existing page built with another technology (either a server one like Rails, or a client one like Backbone), and you want to render interactive React components somewhere on that page. That's a common way to integrate React--in fact, it's how most React usage looked at Meta for many years!

You can do this in two steps:

1. **Set up a JavaScript environment** that lets you use the [JSX syntax](/learn/writing-markup-with-jsx), split your code into modules with the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax, and use packages (for example, React) from the [npm](https://www.npmjs.com/) package registry.
2. **Render your React components** where you want to see them on the page.

The exact approach depends on your existing page setup, so let's walk through some details.
```

The following substitution sets the URI Fragment. (A URI Fragment means the `#fragment` part in `https://www.example.com#fragment`.)

```txt
{/* ... */}
```

#### 2-1-3. Tistory Blog

```html
<li><a href="[##_tag_link_##]" class="[##_tag_class_##]">[##_tag_name_##]</a></li>
```

The following substitution sets HTML attributes<sup>Attribute</sup>.

```txt
[## ... ##]
```

#### 2-1-4. GitHub Actions<sup>GitHub Actions</sup>

```yml
- name: Set up cache
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

The following substitution passes the value<sup>Value</sup> of a variable.

```txt
${{ ... }}
```

### 2-2. Then What Substitution Should We Use?

In fact, deciding which substitution to use depends on the decision of an individual or organization. However, if you use common Markdown syntax, for example the `**` symbol used for emphasis or the `##` symbol used for a heading<sup>Heading</sup>, conflicts can occur between the substitution and Markdown syntax, so it is better to avoid those parts.

The substitution forms presented as examples above do not have concerns about conflicts with common Markdown syntax, so it would be fine to take and use them as they are.

Also, there is no need to use only one substitution form. As long as you can manage consistent substitution forms, it does not matter much whether you mix several substitution symbols or create extensible substitutions by using a specific prefix<sup>Prefix</sup> or suffix<sup>Suffix</sup>.

### 2-3. How Should Substitutions Be Transformed?

Now that we have decided on a substitution structure, it is time to change the substitutions into the actual values I want. What would be good? The simplest method is to use JavaScript's<sup>JavaScript</sup> `replace` function and capture groups<sup>Capture Group</sup> in regular expressions.

For example, suppose we use a substitution in the `{/* ... */}` form used in the official React<sup>React</sup> documentation. How should we extract and process only the string inside the `{/* ... */}` substitution?

```js
const example = '{/* Make This Sentence Lower Case */}';
const exampleProcessed = example.replace(/\{\/\*\s*(.+?)\s*\*\/\}/, (_, p1) =>
  p1.toLowerCase(),
);

console.log(exampleProcessed); // 'make this sentence lower case'
```

Through the method above, you should be able to extract and process the string inside the substitution. In the example above, to keep it simple, the string was changed only to lowercase in bulk, but in a real development environment, more complex logic could be added.

However, if the entire Markdown document is put into the logic above, conversion time may take longer than expected, so it is important to optimize by applying conversion logic only to the necessary parts.

### 3. Closing

We looked at how to create and use Markdown substitutions with a simple example. The content above can also be considered a kind of Markdown preprocessing<sup>Preprocessing</sup> process. This is not about how to use a library or framework or about a specific setting; it explains a part where developers must design and build the flow themselves, so I hope it can be used as a reference like, "This kind of method exists too!"
