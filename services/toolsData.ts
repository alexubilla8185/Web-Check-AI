
export interface Tool {
  name: string;
  description: string;
  link: string;
}

export interface ToolCategory {
  category: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    category: 'Text Utilities',
    tools: [
      { 
        name: 'Text to Uppercase Converter', 
        description: 'The text to uppercase converter is a free-to-use online tool to instantly change your text to uppercase.', 
        link: 'https://convertcase.net/' 
      },
      { 
        name: 'Text to Lowercase Converter', 
        description: 'The text to lowercase converter helps instantly change your entire text to lowercase letters.', 
        link: 'https://convertcase.net/' 
      },
      { 
        name: 'Word Count Tool', 
        description: 'The word count tool instantly shows the word and character count of your entire text.', 
        link: 'https://wordcounter.net/' 
      },
      { 
        name: 'Character Counter', 
        description: 'The character counter is a free-to-use tool that instantly counts characters for any text.', 
        link: 'https://www.charactercountonline.com/' 
      },
      { 
        name: 'Line Counter', 
        description: 'The line counter tool instantly shows the number of lines in your input text.', 
        link: 'https://www.textfixer.com/tools/line-counter.php' 
      },
      { 
        name: 'Sentence Counter', 
        description: 'A free-to-use utility tool to count the number of sentences in a block of text.', 
        link: 'https://wordcounter.net/sentence-counter' 
      },
    ]
  },
  {
    category: 'Code Minifiers & Formatters',
    tools: [
       { 
        name: 'JavaScript Minifier', 
        description: 'The JavaScript minifier is a free-to-use dev utility tool for compressing JS code.', 
        link: 'https://jscompress.com/' 
      },
      { 
        name: 'JSON Minifier', 
        description: 'The JSON minifier is a free online utility tool that helps to minify JSON data.', 
        link: 'https://www.toptal.com/developers/json-minifier' 
      },
      { 
        name: 'JSON Prettier', 
        description: 'The JSON prettier is a free online utility tool for beautifying and formatting JSON.', 
        link: 'https://jsonformatter.curiousconcept.com/' 
      },
    ]
  },
  {
    category: 'Generators & Converters',
    tools: [
      { 
        name: 'Lorem Ipsum Generator', 
        description: 'Generate placeholder text for your design and development projects.', 
        link: 'https://www.lipsum.com/' 
      },
      { 
        name: 'HTML To Markdown', 
        description: 'Convert any HTML document into its Markdown equivalent quickly and easily.', 
        link: 'https://www.browserling.com/tools/html-to-markdown' 
      },
      { 
        name: 'Markdown To HTML', 
        description: 'A free online utility that converts your Markdown text to clean, semantic HTML.', 
        link: 'https://markdowntohtml.com/' 
      },
    ]
  }
];
