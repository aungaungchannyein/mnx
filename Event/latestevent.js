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
      let popUpEvent = filteredEvents.filter((event) => event.status === "POPUP");

      registerNowEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      watchNowEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

      //let sortedEvents = registerNowEvents.concat(watchNowEvents, popUpEvent);
      let sortedEvents = popUpEvent.concat(watchNowEvents, registerNowEvents);

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
                  ${event.status === "POPUP" ?
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
        //let title = $(this).data("title");
        //let desc = $(this).data("desc");
           // Set modal content
      //$("#modalTitle").text(title);
      $("#modalBody").html(`    <p>Join TradingHub Community on our Leadership Seminar and Kickoff event in Oslo on the 1st of March 2025. Monaxa is taking Scandinavia by storm!</p>
        <p>There will be workshop, keynote speakers and sharing of knowledge, experiences and strategies on how the community have chosen to learn and comprehend trading, while earning at the same time.</p>
        <p>We will share leadership skillsets like how to present as a leader, how you can build your organisation, sales and marketing strategies, and all the exciting news ahead!</p>
        <p>Our Keynote Speaker Mat Clarke, the Chief Investment Officer of Monaxa, will not only share some of the strategies he uses daily as a licensed institutional trader, but also how his journey in the trading space turned out to be. He will share how the innovative principles of Monaxa, the proactive team, and productive partners worldwide, will contribute to the paradigm shift we have already entered, in this information and technology revolution era our world is living in.</p>
        <p>Are you curious about how we as a community can stand together, no matter what level or experience we have, help each other, and be social together at TradingHub Meetups, home meetings, business planning sessions, and events?<br/>Where Knowledge, Technology, and Community are the three main focus areas and foundation of the whole community?</p>
        <p>Then this event is for you!</p>
        <p>Please go to our community app for program and tickets:</p>
        <br/>
        <a href="https://nas.io/tradinghub-community" target="_blank" class="btn btn-warning" style="background-color: #fad65a">Register Now</a>
        <br/>
        <br/>
        <p>Goodie bag and Kickoff Dinner are included in the ticket price.</p>
        <p>We have a 7-day free trial to our community app, please use the code: <strong>7DAYSFREE</strong></p>`);

      // Show the modal
      $("#eventModal").modal("show");
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

// Add modal HTML structure to your page
$(document).ready(function () {
  $("body").append(`
 <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
      </div>
    </div>
  </div>
</div>



  `);
});

  renderEvents("all");
</script>
