const visitorForm = document.getElementById("visitorForm");

visitorForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const visitor = {

        fullName: document.getElementById("fullName").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        company: document.getElementById("company").value,

        visitorType: document.getElementById("visitorType").value,

        personToVisit: document.getElementById("personToVisit").value,

        department: document.getElementById("department").value,

        purpose: document.getElementById("purpose").value,

        expectedCheckout:
            document.getElementById("expectedCheckout").value,

        idType: document.getElementById("idType").value,

        idNumber: document.getElementById("idNumber").value,

        idVerified:
            document.getElementById("idVerified").checked,

        items:
            document.getElementById("items").value,

        checkInDate:
            new Date().toLocaleDateString(),

        checkInTime:
            new Date().toLocaleTimeString(),

        status: "Checked In"

    };


    console.log(visitor);


    alert(
        "Visitor successfully checked in!\n\n" +
        "Name: " + visitor.fullName +
        "\nVisitor Type: " + visitor.visitorType +
        "\nStatus: " + visitor.status
    );


    visitorForm.reset();

});