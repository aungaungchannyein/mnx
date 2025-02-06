<script>
  var groupIndiaAbout1 = ["BH", "IQ", "OM", "QA", "AE", "PS", "TN", "DZ", "MA"];
  var groupIndiaAbout2 = ["IN", "BD"];
  var groupIndiaAbout3 = ["PK", "JO", "KW", "SA", "EG"];
  var groupIndiaAbout4 = ["AF", "LB", "SY", "YE", "LY"];

  function isInIndiaGroup(countryCode) {
    return (
      groupIndiaAbout1.includes(countryCode) ||
      groupIndiaAbout2.includes(countryCode) ||
      groupIndiaAbout3.includes(countryCode) ||
      groupIndiaAbout4.includes(countryCode)
    );
  }

  var countryCodeChecker = localStorage.getItem("country_code");

  if (isInIndiaGroup(countryCodeChecker)) {
    $(".worldwidegov").remove();
    $(".indiagov").show();
  } else {
    $(".indiagov").remove();
    $(".worldwidegov").show();
  }

  let itemsDisplayed = 4;

  function renderEvents(selectedCountry, searchText = "") {
    $("#dom_section").empty();

    $.getJSON("https://cdn.learnwurks.com/assets/img/event_24/js/data4.json?version=5.0", function (data) {
      let count = 0;
      let filteredEvents = data.filter(
        (event) =>
          (selectedCountry === "all" || event.country.toLowerCase() === selectedCountry.toLowerCase()) &&
          (searchText === "" || event.title.toLowerCase().includes(searchText.toLowerCase()))
      );

      let registerNowEvents = filteredEvents.filter((event) => event.status === "Register Now");
      let watchNowEvents = filteredEvents.filter((event) => event.status === "Watch Now");
      let apiEvents = filteredEvents.filter((event) => event.status === "API");

      registerNowEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      watchNowEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

      //let sortedEvents = registerNowEvents.concat(watchNowEvents, apiEvents);
      let sortedEvents = apiEvents.concat(watchNowEvents, registerNowEvents);

      $.each(sortedEvents, function (index, event) {
        if (count >= itemsDisplayed) return false;
        if (
          (selectedCountry === "all" || event.country.toLowerCase() === selectedCountry.toLowerCase()) &&
          (searchText === "" || event.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          let descHtml = Array.isArray(event.desc)
            ? event.desc.map((line) => `<p>${line}</p>`).join("")
            : `<p>${event.desc}</p>`;
          let cardHtml = `<div class="card align-items-center custom-card-style">
                  <img src="${event.image}" class="card-img-top" alt="Event Thumbnail">
                  <div class="card-body body-custom">
                    <h5 class="card-title title-custom">${event.title}</h5>
                    <div class="desc-custom">${descHtml}</div>
                  </div>
                  <div class="row-second column">
                    <small class="text-muted small-text-custom">${event.date}</small>
                    <small class="text-muted small-text-custom">${event.time}</small>
                    <div class="globe">${event.region_gmt}</div>
                  </div>
                  ${event.status === "API" ?
            `<div class="row-third column">
              <button class="btn btn-warning btn-custom-popup" data-title="${event.title}" data-desc="${event.desc}">More Info</button>
            </div>` :
            `${event.statusBtn !== 'hide' ? `<div class="row-third column">
              <a href="${event.link}" target="_blank" class="btn btn-warning btn-custom-event">${event.status}</a>
            </div>` : ''}`}
                </div>`;

          $("#dom_section").append(cardHtml);
          count++;
        }
      });

      if (count < itemsDisplayed || itemsDisplayed >= data.length) {
        $("#load_more_btn").hide();
      } else {
        $("#load_more_btn").show();
      }

      $(".btn-custom-popup").click(function () {
        let title = $(this).data("title");
        let desc = $(this).data("desc");
        alert(`Event: ${title}\nDescription: ${desc}`);
      });
    });
  }

  $("#load_more_btn").click(function (event) {
    event.preventDefault();
    itemsDisplayed += 4;
    let selectedCountry = $("#select_country").val() || "all";
    let searchText = $("#event_search").val();
    renderEvents(selectedCountry, searchText);
  });

  $("#select_country").on("change", function () {
    let selectedCountry = $(this).val();
    let searchText = $("#event_search").val();
    renderEvents(selectedCountry, searchText);
  });

  $("#event_search").on("input", function () {
    let searchText = $(this).val();
    let selectedCountry = $("#select_country").val() || "all";
    renderEvents(selectedCountry, searchText);
  });

  renderEvents("all");
</script>
