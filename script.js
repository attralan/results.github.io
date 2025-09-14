document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("lookupForm");
  const indexInput = document.getElementById("indexInput");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  let studentsData = [];

  // Fetch the students.json file
  fetch('students.json')
    .then(response => {
      if (!response.ok) throw new Error("Could not load student data");
      return response.json();
    })
    .then(data => {
      studentsData = data;
    })
    .catch(err => {
      errorDiv.textContent = "Failed to load student records.";
      form.style.display = "none";
    });

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const index = indexInput.value.trim();
    errorDiv.textContent = "";
    resultDiv.textContent = "";

    // Input validation
    if (index.length !== 7 || !/^\d+$/.test(index)) {
      errorDiv.textContent = "Please enter a valid 7-digit index number.";
      return;
    }

    // Search for the student
    const student = studentsData.find(s => s.index === index);

    if (!student) {
      errorDiv.textContent = "No results found for this index number.";
      return;
    }

    // Render result
    let html = `<h2>Result for ${student.name}</h2>`;
    html += `<ul>`;
    for (let subject in student.subjects) {
      html += `<li>${subject}: <strong>${student.subjects[subject]}</strong></li>`;
    }
    html += `</ul>`;

    resultDiv.innerHTML = html;
  });
});
