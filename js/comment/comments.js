
const fetchComments = async () => {
  const resp = await fetch("/static/comments.json");
  return await resp.json();  
}

const fetchUser = async (id) => {
  const resp = await fetch("/static/users.json");
  const usersData = await resp.json();
  return usersData.find(item => item.id === id);
}

const displayComments = async (issueId) => {
  const commentsData = await fetchComments();
  const issue = commentsData.find(item => item.issue === issueId);
  const comments = issue?.comments || [];
  const container = document.getElementById("comments-container");

  // Container wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("container");
  container.appendChild(wrapper);

  // Issue title
  const issueTitle = document.createElement("h2");
  issueTitle.innerText = issue.title;
  wrapper.appendChild(issueTitle);


  comments.forEach(async (comment) => {
    // Fetch comment's owner info
    const user = await fetchUser(comment.owner);

    // Comment container = header + content
    const cmtContainer = document.createElement("div");
    const indent = comment.level * 4;
    cmtContainer.classList.add("container", "border", "border-dark", "rounded-lg", "my-4", "py-4");
    wrapper.appendChild(cmtContainer);
    
    // Comment header = left + right
    const cmtHeader = document.createElement("div");
    cmtHeader.classList.add("d-flex", "flex-row", "justify-content-between", "align-items-center");
    cmtContainer.appendChild(cmtHeader);

    // Comment header left
    const cmtHeaderLeft = document.createElement("div");
    cmtHeaderLeft.classList.add("d-flex", "flex-row");
    cmtHeader.appendChild(cmtHeaderLeft);

    // Comment header left avatar
    const userAvatar = document.createElement("img");
    userAvatar.src = user.avatar;
    userAvatar.style = "max-height: 40px;";
    userAvatar.classList.add("rounded-circle", "mx-2");
    cmtHeaderLeft.appendChild(userAvatar);

    // Comment header left info
    const cmtInfo = document.createElement("div");
    const username = user.username;
    const createAt = comment.time;
    cmtInfo.innerHTML = `<div>${username}</div><div>${createAt}</div>`;
    cmtHeaderLeft.appendChild(cmtInfo);

    // Comment header right
    const cmtHeaderRight = document.createElement("div");
    cmtHeaderRight.classList.add("d-flex", "flex-row");
    const watchIcon = document.createElement("i");
    watchIcon.classList.add("fas", "fa-fw", "fa-eye");
    const shareIcon = document.createElement("i");
    shareIcon.classList.add("fas", "fa-fw", "fa-reply");
    cmtHeaderRight.appendChild(shareIcon);
    cmtHeaderRight.appendChild(watchIcon);
    cmtHeader.appendChild(cmtHeaderRight);

    // Comment body
    const cmtBody = document.createElement("div");
    cmtBody.classList.add("p-2");
    cmtContainer.appendChild(cmtBody);

    // Comment content
    const cmtContent = document.createElement("p");
    cmtContent.innerText = comment.content;
    cmtBody.appendChild(cmtContent);
  })
}

