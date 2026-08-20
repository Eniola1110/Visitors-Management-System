const visitorForm = document.getElementById("visitorForm");

visitorForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const visitor = {

        full_name:
            document.getElementById("fullName").value.trim(),
        phone_number:
            document.getElementById("phone").value.trim(),
        email:
            document.getElementById("email").value.trim(),
        company:
            document.getElementById("company").value.trim(),
        visitor_type:
            document.getElementById("visitorType").value,
        person_to_visit:
            document.getElementById("personToVisit").value.trim(),
        department_id:
            document.getElementById("department").value,
        reason:
            document.getElementById("purpose").value.trim(),
        purpose:
            document.getElementById("purpose").value.trim(),
        id_type:
            document.getElementById("idType").value,
        id_number:
            document.getElementById("idNumber").value.trim(),
        items_brought_in:
            document.getElementById("items").value.trim()
    };

    console.log("Sending visitor:", visitor);

    try {
        const response = await fetch(
            "http://localhost:5000/api/visitors",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(visitor)
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to register visitor"
            );
        }
        // Successful registration
        alert(
            "Visitor successfully checked in!\n\n" +
            "Name: " + visitor.full_name + "\n" +
            "Visitor Type: " + visitor.visitor_type + "\n" +
            "Status: Checked In"
        );
        console.log("Visitor registered:", data);

        // Clear form

        visitorForm.reset();
    } catch (error) {
        console.error("Error:", error);
        alert(
            "Failed to register visitor.\n\n" +
            error.message
        );
    }

});
// FETCH DEPARTMENTS
const fetchDepartments = async () => {
    try {

        const response = await fetch(
            "http://localhost:5000/api/departments"
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch departments"
            );
        }
        const data = await response.json();

        const departmentSelect =
            document.getElementById("department");

        data.message.forEach(department => {

            const option =
                document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;
            departmentSelect.appendChild(option);

        });
    } catch (error) {
        console.error(
            "Failed to load departments:",
            error
        );
    }
};
fetchDepartments();