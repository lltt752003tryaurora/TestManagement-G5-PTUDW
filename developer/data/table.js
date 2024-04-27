const populateTable = () => {
  const tableBody = document.getElementById("table-body");

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
    // idCell.textContent = data.id;
    titleCell.textContent = data.title;
    // createdByCell.textContent = data.createdBy;
    // assignedToCell.textContent = data.assignedTo;
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
      statusCell.classList.add("text-primary"); // Bootstrap class for blue text
    } else if (data.status_ === "closed") {
      statusCell.classList.add("text-secondary"); // Bootstrap class for purple text
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

let users;
const fetchUser = async () => {
  try {
    const resp = await fetch("/developer/data/users.json");
    users = await resp.json();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
}

let tableData;
const fetchTable = async () => {
    try {
      const resp = await fetch("/developer/data/table.json");
      tableData = await resp.json();
      console.log(tableData);
    } catch (err) {
      console.log(err);
    }
}

fetchUser()
  .then(() => {
    fetchTable()
      .then(() => {
        populateTable();
      })
  })