var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");

var siteList = [];


if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

submitBtn.onclick = function () {
  if (validateName(siteName.value) && validateURL(siteURL.value)) {
    var site = {
      name: siteName.value.trim(),
      url: siteURL.value.trim().startsWith("http") ? siteURL.value.trim() : `https://${siteURL.value.trim()}`
    };
    siteList.push(site);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displayData();
    clearForm();
  } else {
    alert("Please enter a valid Site Name and URL (e.g., https://example.com)");
  }
};

function displayData() {
  var content = "";
  for (var i = 0; i < siteList.length; i++) {
    content += `
      <tr>
        <td>${i + 1}</td>
        <td>${siteList[i].name}</td>
        <td><a href="${siteList[i].url}" target="_blank"><button class="visit-btn"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="delete-btn"><i class="fa-solid fa-trash"></i> Delete</button></td>
      </tr>
    `;
  }
  tableContent.innerHTML = content;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  displayData();
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function validateName(name) {
  return name.trim().length >= 3;
}

function validateURL(url) {
  var regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-z]{2,})(\/.*)?$/;
  return regex.test(url);
}
