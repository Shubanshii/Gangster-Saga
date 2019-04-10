function createQuestion() {
  let idStore = "";
  let index = Number;

  function getQuestions(callback) {
    $.ajax({
      type: "GET",
      url: "/questions",
      success: callback,
      dataType: "json",
      contentType: "application/json"
    });
  }

  function storeIndex(data) {
    console.log(data.length);
    index = data.length;
  }

  getQuestions(storeIndex);

  function getId(callback) {
    $.ajax({
      type: "GET",
      url: "/get-id",
      success: callback,
      dataType: "json",
      contentType: "application/json"
    });
  }

  function storeId(id) {
    console.log("storing");
    idStore = id;
    console.log("id", idStore);
  }

  getId(storeId);

  $.fn.serializeObject = function() {
    console.log("idstoreinfunc", idStore);
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    console.log(this);
    o.choices = o.choices.split(", ");
    o.owner = idStore;
    // hardcoded for now
    o.index = index;
    o.redirect = "/profile";
    console.log(o);
    return o;
  };

  $(".add-question").submit(function(event) {
    let postObject = JSON.stringify($(".add-question").serializeObject());
    // // postObject.choices = postObject.choices.split(",");
    console.log(postObject);
    $.ajax({
      type: "POST",
      url: "/questions",
      data: JSON.stringify($(".add-question").serializeObject()),
      success: function() {},
      dataType: "json",
      contentType: "application/json"
    });

    event.preventDefault();
  });
}

$(document).ready(function() {
  console.log("loading client-side js");
  createQuestion();
});
