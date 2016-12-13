import React from 'react';

export default function(props) {
  let issueTitle = encodeURIComponent("Problem with mapping of " + props.title)
  let issueBody = encodeURIComponent("I expected to see:\n\n*[WHAT I EXPECTED]*\n\nbut instead I saw:\n\n*[WHAT I SAW]*\n\nThe current query was:\n\n```ttl\n"+props.query+"\n```")
  let issueLinkUrl = `https://github.com/american-art/aac_mappings/issues/new?title=${issueTitle}&body=${issueBody}`

  return (
    <div className="github_issue_link">
      <a href={issueLinkUrl} target='_blank'>Do you see a problem with this?  Submit an issue.</a>
    </div>
  )
}
