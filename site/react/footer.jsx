import React from "react";

export default function(props) {
  let y = new Date().getFullYear();
  let copyright_year = y == 2016 ? "2016" : `2016-${y}`;
  return (
    <footer>
      <p>
        Developed by{" "}
        <a href="http://www.designforcontext.com" target="_blank">
          Design for Context
        </a>. Copyright © {copyright_year}.
      </p>
      <p>
        This is a project of the{" "}
        <a href="http://americanartcollaborative.org/" target="_blank">
          American Art Collaborative
        </a>. Source code available on{" "}
        <a
          href="https://github.com/designforcontext/aac_review_tool"
          target="_blank"
        >
          Github
        </a>.
      </p>
    </footer>
  );
}
