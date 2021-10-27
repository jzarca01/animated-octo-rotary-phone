import * as React from 'react';
import ReactDOMServer from 'react-dom/server.js';

export function render(head) {
  return `<!DOCTYPE html>
    <html>
        ${head}
        <body>
            <div id="app"></div>
        </body>
        <script>
        window.onload = function() {
        location.href = "https://www.youtube.com/watch?v=DLzxrzFCyOs";
    }
    </script>
    </html>`;
}
