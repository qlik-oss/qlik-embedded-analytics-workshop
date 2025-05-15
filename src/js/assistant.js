// Description: This script provides a live HTML preview feature with line numbers and formatting capabilities.
// It includes a text area for HTML input, a preview area, and a button to format the HTML.
// It also sanitizes the HTML to prevent XSS attacks and ensures that links in the preview do not navigate away from the page.
// It uses DOMPurify for sanitization and provides a simple formatting function to indent the HTML properly.
// Dependencies: DOMPurify (for sanitization)

(async() => {
  const response = await fetch('/config');
  const config = await response.json();

  // Initial HTML example
  const initialHtml = `<qlik-embed
  id="assistant"
  ui="ai/assistant"
  assistant-id="${config.assistantId}"
  appearance="qlik-light"
></qlik-embed>`;

  // DOM elements
  const htmlEditor = document.getElementById('htmlEditor');
  const lineNumbers = document.getElementById('lineNumbers');
  const previewContent = document.getElementById('previewContent');
  const lineCount = document.getElementById('lineCount');
  const formatButton = document.getElementById('formatButton');


  // Set initial content
  htmlEditor.value = initialHtml;
  updateLineCount();
  updateLineNumbers();
  updatePreview();

  // Event listeners
  htmlEditor.addEventListener('input', () => {
    updatePreview();
    updateLineCount();
    updateLineNumbers();
  });

  htmlEditor.addEventListener('scroll', () => {
    // Sync line numbers scroll position with textarea
    lineNumbers.scrollTop = htmlEditor.scrollTop;
  });

  formatButton.addEventListener('click', () => {
    formatHtml();
  });

  // Update line count
  function updateLineCount() {
    const lines = htmlEditor.value.split('\n').length;
    lineCount.textContent = `${lines} lines`;
  }

  // Update line numbers
  function updateLineNumbers() {
    const lines = htmlEditor.value.split('\n').length;
    console.log('Lines:', lines);
    let lineNumbersHtml = '';

    for (let i = 1; i <= lines; i++) {
      lineNumbersHtml += `${i}<br>`;
    }

    lineNumbers.innerHTML = lineNumbersHtml;
  }

  // Format HTML with proper indentation
  function formatHtml() {
    const html = htmlEditor.value;

    try {

      // Get the formatted HTML
      const formattedHtml = prettyPrintHTML(html);
      console.log('Formatted HTML:', formattedHtml);
      // Set the formatted HTML in the editor
      htmlEditor.value = formattedHtml;

      // Update everything
      updateLineCount();
      updateLineNumbers();
      updatePreview();
    } catch (error) {
      console.error('Error formatting HTML:', error);
      alert('Error formatting HTML. Check console for details.');
    }
  }

  function prettyPrintHTML(rawHtml) {
    const lines = rawHtml.trim().split('\n');

    let indentLevel = 0;
    const indentSize = 2;
    const result = [];

    for (let rawLine of lines) {
      const line = rawLine.trim();

      // Check if this line is a closing tag or a self-contained closing line
      const isClosingTag = /^<\/[^>]+>/.test(line);
      const isSelfClosing = /\/>$/.test(line) || line.startsWith('<!');

      if (isClosingTag) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }

      result.push(' '.repeat(indentLevel * indentSize) + line);

      if (!isClosingTag && !isSelfClosing && /^<[^/!][^>]*[^/]?>$/.test(line)) {
        indentLevel++;
      }
    }

    return result.join('\n');
  }


  // Simple HTML sanitization function
  function sanitizeHtml(html) {
    // Create a new div element
    const tempDiv = document.createElement('div');
    // Set the HTML content
    const params = {
          CUSTOM_ELEMENT_HANDLING: {
              tagNameCheck: /^qlik-/, // allow all tags starting with "foo-
              allowCustomizedBuiltInElements: true, // customized built-ins are allowed
          },
          ADD_ATTR: ["id", "class", "style", "ui", "app-id", "object-id", "theme", "disable-cell-padding", "type", "dimensions", "measures", "sheet-id"]
      }
    const clean = DOMPurify.sanitize(html, params);
    tempDiv.innerHTML = clean;

    return tempDiv.innerHTML;
  }

  // Update preview with sanitized HTML
  function updatePreview() {
    try {
      const html = htmlEditor.value;
      const sanitizedHtml = sanitizeHtml(html);

      // delete children from previewContent
      while (previewContent.firstChild) {
        previewContent.removeChild(previewContent.firstChild);
      }

      // Update the preview content
      let newDiv = document.createElement('div');
      newDiv.classList.add("app");
      newDiv.innerHTML = sanitizedHtml;
      previewContent.appendChild(newDiv);

      // Make links non-functional to prevent navigation
      const links = previewContent.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
        });
      });

    } catch (error) {
      console.error('Error updating preview:', error);
      previewContent.innerHTML = `<div style="color: red; padding: 10px;">Error rendering HTML: ${error.message}</div>`;
    }
  }
})();