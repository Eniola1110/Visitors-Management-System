const API_URL = "http://localhost:5000/api/visitors";

const visitorTableBody =
    document.getElementById("visitorTableBody");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const searchInput =
    document.getElementById("searchInput");

let visitors = [];



// FETCH VISITORS
const fetchVisitors = async () => {

    try {

        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to fetch visitors"
            );

        }
        console.log("Visitors:", data);
        visitors = data.message;

        displayVisitors(visitors);
    } catch (error) {
        console.error(error);
        errorMessage.textContent =
            "Failed to load visitors: " + error.message;
        errorMessage.style.display = "block";
    } finally {
        loadingMessage.style.display = "none";
    }
};



// DISPLAY VISITORS

const displayVisitors = (visitorList) => {

    visitorTableBody.innerHTML = "";

    if (!visitorList || visitorList.length === 0) {
        visitorTableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No visitors found.
                </td>
            </tr>
        `;
        return;
    }

    visitorList.forEach(visitor => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                ${visitor.full_name || "-"}
            </td>

            <td>
                ${visitor.phone_number || "-"}
            </td>

            <td>
                ${visitor.visitor_type || "-"}
            </td>

            <td>
                ${visitor.department_name}
            </td>
 
             <td>
                ${visitor.company}
            </td>

            <td>
                ${visitor.person_to_visit || "-"}
            </td>

             <td>
                ${visitor.items_brought_in}
            </td>
            <td>
                ${formatDateTime(visitor.check_in_time)}
            </td>

            <td>
                ${formatDateTime(visitor.check_out_time)}
            </td>

            <td>
                <span class="status ${getStatusClass(visitor.status)}">
                    ${visitor.status || "Checked In"}
                </span>
            </td>
            <td>
                <button
                    class="action-btn edit-btn"
                    onclick="editVisitor(${visitor.id})"
                >
                    Edit
                </button>
                <button
                    class="action-btn delete-btn"
                    onclick="deleteVisitor(${visitor.id})"
                >
                    Delete
                </button>
                ${
                    visitor.status !== "checked_out"
                    ? `
                        <button
                            class="action-btn checkout-btn"
                            onclick="checkoutVisitor(${visitor.id})"
                        >
                            Check Out
                        </button>
                        `
                    : ""
                }

            </td>

        `;

        visitorTableBody.appendChild(row);

    });

};

// FORMAT DATE
const formatDateTime = (date) => {

    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleString();
};

// STATUS CLASS
const getStatusClass = (status) => {

    if (!status) {
        return "checked-in";
    }
    return status.toLowerCase().replace(" ", "-");

};

// CHECK OUT VISITOR

const checkoutVisitor = async (id) => {

    const confirmCheckout =
        confirm("Are you sure you want to check out this visitor?");

    if (!confirmCheckout) {
        return;
    }
    try {
        const response = await fetch(
            `${API_URL}/${id}/checkout`,
            {
                method: "PATCH"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to check out visitor"
            );
        }
        alert(data.message);

        fetchVisitors();
    } catch (error) {
        console.error(error);
        alert(
            "Failed to check out visitor.\n\n" +
            error.message
        );
    }
};

// DELETE VISITOR
const deleteVisitor = async (id) => {

    const confirmDelete =
        confirm("Are you sure you want to delete this visitor?");
    if (!confirmDelete) {
        return;
    }
    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.message || "Failed to delete visitor"
            );
        }
        alert(data.message);
        fetchVisitors();

    } catch (error) {

        console.error(error);
        alert(
            "Failed to delete visitor.\n\n" +
            error.message
        );
    }

};

// EDIT VISITOR
const editVisitor = (id) => {
    window.location.href =
        `edit.html?id=${id}`;
};


// SEARCH VISITORS
searchInput.addEventListener("input", function () {

    const searchTerm =
        this.value.toLowerCase().trim();

    const filteredVisitors =
        visitors.filter(visitor => {

            const name =
                (visitor.full_name || "").toLowerCase();
            const phone =
                (visitor.phone_number || "").toLowerCase();

            return (
                name.includes(searchTerm) ||
                phone.includes(searchTerm)
            );
        });
    displayVisitors(filteredVisitors);
});

fetchVisitors();