let assessments = [];

let currentSubject = "All";


fetch("assessments.json")

    .then(response => response.json())

    .then(data => {

        assessments = data;

        displayAssessments();

    })

    .catch(error => {

        document.getElementById("assessmentContainer").innerHTML =
            "<p>Unable to load assessments.</p>";

        console.error(error);

    });



function displayAssessments() {

    const container =
        document.getElementById("assessmentContainer");

    container.innerHTML = "";


    let filteredAssessments;


    if (currentSubject === "All") {

        filteredAssessments = assessments;

    } else {

        filteredAssessments =
            assessments.filter(
                assessment =>
                    assessment.subject === currentSubject
            );

    }


    if (filteredAssessments.length === 0) {

        container.innerHTML =
            "<p class='loading'>No assessments available.</p>";

        return;
    }


    filteredAssessments.forEach(assessment => {

        const card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

            <span class="subject">
                ${assessment.subject}
            </span>

            <h3>
                ${assessment.title}
            </h3>

            <p class="date">
                📅 Upload Date: ${assessment.date}
            </p>

            <a
                class="open-btn"
                href="${assessment.file}"
                target="_blank"
            >
                📄 Open Assessment
            </a>

        `;


        container.appendChild(card);

    });

}



function filterSubject(subject) {

    currentSubject = subject;

    displayAssessments();

}
