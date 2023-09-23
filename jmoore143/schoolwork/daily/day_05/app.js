let $ = function (e) {
    return document.getElementById(e);
};
$ = document.getElementById;

let joinList = function () {

    let emailAddress1 = $("email_address1").value;
    let emailAddress2 = $("email_address2").value;

    // console.log(emailAddress1, emailAddress2);

    let isValid = true;
    
    if (!emailAddress1.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $("email_address1_error").firstChild.nodeValue = "This field is required for input.";
        isValid = false;
    } else {
        $("email_address1_error").firstChild.nodeValue = "";
    }
    // console.log(isValid);


    if (emailAddress1 !== emailAddress2) {
        $("email_address2_error").firstChild.nodeValue = "This entry must equal first entry.";
        isValid = false;
    } else {
        $("email_address2_error").firstChild.nodeValue = "";
    }
    // console.log(isValid);


    if ($("first_name").value === "") {
        $("first_name_error").firstChild.nodeValue = "This field is required.";
        isValid = false;
    } else {
        $("first_name_error").firstChild.nodeValue = "";
    }
    console.log(isValid);

    if (isValid) { $("email_form").submit(); }

};

window.onload = function () {

    $("email_address1").onchange = joinList;
    $("email_address2").onchange = joinList;
    // $("first_name").onchange = joinList;
    // console.log("windows.onload run");
    // console.log(e);

    document.getElementById("join_list").onclick = joinList;
    document.getElementById("email_address1").focus();

};