const API_URL = "http://localhost:5000/api/visitors";

const editVisitorForm =
    document.getElementById("editVisitorForm");

const urlParams = new URLSearchParams(
    window.location.search
);

const visitorId = urlParams.get("id");

if (!visitorId) {
    alert("Visitor ID not found.");
    window.location.href = "history.html";
}

// FETCH DEPARTMENTS

const fetchDepartments = async (selectedDepartmentId) => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/departments"
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.message || "Failed to fetch departments"
            );
        }
        const departmentSelect =
            document.getElementById("department");
        data.message.forEach(department => {

            const option =
                document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;

            departmentSelect.appendChild(option);
        });

        departmentSelect.value =
            selectedDepartmentId;
    } catch (error) {
        console.error(
            "Failed to load departments:",
            error
        );
    }
};

// FETCH VISITOR
const fetchVisitor = async () => {
    try {
        const response = await fetch(
            `${API_URL}/${visitorId}`
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.message || "Failed to fetch visitor"
            );
        }
        console.log("Visitor:", data);

        const visitor =
            data.visitor;
        
        document.getElementById("fullName").value =
            visitor.full_name || "";
        document.getElementById("phone").value =
            visitor.phone_number || "";
        document.getElementById("email").value =
            visitor.email || "";
        document.getElementById("company").value =
            visitor.company || "";
        document.getElementById("visitorType").value =
            visitor.visitor_type || "";
        document.getElementById("personToVisit").value =
            visitor.person_to_visit || "";
        document.getElementById("purpose").value =
            visitor.purpose || visitor.reason || "";
        document.getElementById("idType").value =
            visitor.id_type || "";
        document.getElementById("idNumber").value =
            visitor.id_number || "";
        document.getElementById("items").value =
            visitor.items_brought_in || "";

        fetchDepartments(
            visitor.department_id
        );
    } catch (error) {
        console.error(error);
        alert(
            "Failed to load visitor.\n\n" +
            error.message
        );
    }
};

// UPDATE VISITOR
editVisitorForm.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();
        
        const updatedVisitor = {
            full_name:
                document.getElementById("fullName").value.trim(),
            phone_number:
                document.getElementById("phone").value.trim(),
            email:
                document.getElementById("email").value.trim(),
            company:
                document.getElementById("company").value.trim(),
            department_id:
                document.getElementById("department").value,
            reason:
                document.getElementById("purpose").value.trim(),
            purpose:
                document.getElementById("purpose").value.trim(),
            person_to_visit:
                document.getElementById("personToVisit").value.trim(),
            visitor_type:
                document.getElementById("visitorType").value,
            id_number:
                document.getElementById("idNumber").value.trim(),
            items_brought_in:
                document.getElementById("items").value.trim(),
            id_type:
                document.getElementById("idType").value
        };
        console.log(
            "Updating visitor:",
            updatedVisitor
        );
        try {
            const response = await fetch(
                `${API_URL}/${visitorId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedVisitor)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update visitor"
                );
            }
            alert(
                data.message ||
                "Visitor updated successfully"
            );
            window.location.href =
                "history.html";
        } catch (error) {
            console.error(error);
            alert(
                "Failed to update visitor.\n\n" +
                error.message
            );
        }
    }
);

fetchVisitor();

