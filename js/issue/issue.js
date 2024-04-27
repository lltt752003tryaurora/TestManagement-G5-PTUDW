const fetchUsers = async () => {
  const resp = await fetch("/static/users.json");
  return await resp.json();
}

const fetchTable = async () => {
const resp = await fetch("/static/issues.json");
return await resp.json();
}

const populateTable = async () => {
  const tableBody = document.getElementById("table-body");
  const users = await fetchUsers();
  const tableData = await fetchTable();

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Loop through tableData array
  tableData.forEach(data => {
    // Create a new row
    const row = document.createElement("tr");

    // Create a cell for each data item
    const checkboxCell = document.createElement("td");
    const idCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const createdByCell = document.createElement("td");
    const assignedToCell = document.createElement("td");
    const statusCell = document.createElement("td");
    const priorityCell = document.createElement("td");
    const createdDateCell = document.createElement("td");

    // Set the innerHTML of each cell
    checkboxCell.innerHTML = `<input type="checkbox">`;
    titleCell.textContent = data.title;
    statusCell.textContent = data.status_;
    priorityCell.textContent = data.priority;
    createdDateCell.textContent = data.createdDate;

    // ID
    const url = document.createElement("a");
    url.innerText = data.id;
    url.href = data.url;
    idCell.appendChild(url);

    // Created by
    const createdByAvatar = document.createElement("img");
    createdByAvatar.src = users[data.createdBy].avatar;
    createdByAvatar.classList.add("rounded-circle");
    createdByAvatar.style.maxHeight = "25px";
    createdByCell.appendChild(createdByAvatar);

    // Assigned to
    const assignedToAvatar = document.createElement("img");
    assignedToAvatar.src = users[data.assignedTo].avatar;
    assignedToAvatar.classList.add("rounded-circle");
    assignedToAvatar.style.maxHeight = "25px";
    assignedToCell.appendChild(assignedToAvatar);

    // Status
    if (data.status_ === "open") {
      statusCell.classList.add("text-primary");
    } else if (data.status_ === "closed") {
      statusCell.classList.add("text-secondary");
    }

    // Priority
    if (data.priority === "high") {
      priorityCell.classList.add("text-danger");
    } else if (data.priority === "medium") {
      priorityCell.classList.add("text-warning");
    } else if (data.priority === "low") {
      priorityCell.classList.add("text-success");
    }

    // Append cells to the row
    row.appendChild(checkboxCell);
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(createdByCell);
    row.appendChild(assignedToCell);
    row.appendChild(statusCell);
    row.appendChild(priorityCell);
    row.appendChild(createdDateCell);

    // Append row to table body
    tableBody.appendChild(row);
  });
}


