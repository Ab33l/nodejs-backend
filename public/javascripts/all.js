function confimrDelete(post_id) {
    var r = confirm("Are you sure what to delete?");
    if (r == true) {
      window.location.href='/posts/delete/'+post_id;
        return;
    } else {
        return false;
    }
}
function confimrDeleteComment(comment_id) {
    var r = confirm("Are you sure what to delete?");
    if (r == true) {
      window.location.href='/comments/delete/'+comment_id;
        return;
    } else {
        return false;
    }
}
    function compareValues() {
    var text1 = document.getElementById("text1").value;
    var text2 = document.getElementById("text2").value;
    var text3 = document.getElementById("text3").value;
    if(!text1 || !text2 || !text3){
      alert("Incorrect. Fill all three spaces with values");
    }else if (text1 == text2 && text2 == text3) {
        alert("Equilateral Triangle. All Sides of the Triangle are Equal");
    }else if (text1 == text2 || text2 == text3 || text1 == text3){
        alert("Isosceles Triangle. Two Sides of The Triangle are equal");
    }else{
      alert("Scalene Triangle. None of the Sides of the Triangle are Equal");
    }
}
