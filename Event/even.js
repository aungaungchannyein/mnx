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
        // Global variable to track the number of items displayed
        let itemsDisplayed = 4;
  
        // Modify the renderEvents function
        function renderEvents(selectedCountry, searchText = "") {
          $("#dom_section").empty(); // Clear the current events
  
          $.getJSON(
            "https://cdn.learnwurks.com/assets/img/event_24/js/data.json?version=5.0",
            function (data) {
              let count = 0;
  
              // First, filter the events based on the selectedCountry and searchText
              let filteredEvents = data.filter(
                (event) =>
                  (selectedCountry === "all" ||
                    event.country.toLowerCase() ===
                      selectedCountry.toLowerCase()) &&
                  (searchText === "" ||
                    event.title.toLowerCase().includes(searchText.toLowerCase()))
              );
  
              console.log("data sort",filteredEvents)
  
              // Separate the filtered events by status
              let registerNowEvents = filteredEvents.filter(
                (event) => event.status === "Register Now"
              );
              let watchNowEvents = filteredEvents.filter(
                (event) => event.status === "Watch Now"
              );
  
              // Sort the "Register Now" events by date
              registerNowEvents.sort(function (a, b) {
                let aDate = new Date(
                  a.date
                    .split("-")
                    .reverse()
                    .join("/")
                    .replace(/\b(\d{1})\b/g, "0$1")
                );
                let bDate = new Date(
                  b.date
                    .split("-")
                    .reverse()
                    .join("/")
                    .replace(/\b(\d{1})\b/g, "0$1")
                );
                return aDate - bDate;
              });
  
              // Optionally, sort "Watch Now" events by date as well, if desired
              watchNowEvents.sort(function (a, b) {
                let aDate = new Date(
                  a.date
                    .split("-")
                    .reverse()
                    .join("/")
                    .replace(/\b(\d{1})\b/g, "0$1")
                );
                let bDate = new Date(
                  b.date
                    .split("-")
                    .reverse()
                    .join("/")
                    .replace(/\b(\d{1})\b/g, "0$1")
                );
                return bDate - aDate; // This line is changed to reverse the sorting order
              });
  
              // Combine the sorted events back together, with "Register Now" first
              let sortedEvents = registerNowEvents.concat(watchNowEvents);
  
              $.each(sortedEvents, function (index, event) {
                if (count >= itemsDisplayed) return false;
                if (
                  (selectedCountry === "all" ||
                    event.country.toLowerCase() ===
                      selectedCountry.toLowerCase()) &&
                  (searchText === "" ||
                    event.title.toLowerCase().includes(searchText.toLowerCase()))
                ) {
                  if (event.region_gmt !== '') {
                    let descHtml = Array.isArray(event.desc) ? event.desc.map(line => `<p>${line}</p>`).join('') : `<p>${event.desc}</p>`;
                  let cardHtml = `<div class="card align-items-center custom-card-style">
                  <img
                    src="${event.image}"
                    class="card-img-top"
                    alt="Thumbnail image representing content or a preview of a webinar or seminar event"
                  />
                  <div class="card-body body-custom">
                    <h5 class="card-title title-custom">
                      ${event.title}
                    </h5>
                    <div class="desc-custom">
              ${descHtml}
            </div>
                  </div>
                  <!--Second Row-->
                  <div class="row-second column">
                    <div class="calendar-icon">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"
                        />
                      </svg>
                    </div>
                    <small class="text-muted small-text-custom"
                      >${event.date}</small
                    >
                    <small class="text-muted small-text-custom"
                      >${event.time}</small
                    >
                    <div class="globe">
                      <div class="event-global">
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                            d="M4.4 7.7c2 .5 2.4 2.8 3.2 3.8 1 1.4 2 1.3 3.2 2.7 1.8 2.3 1.3 5.7 1.3 6.7M20 15h-1a4 4 0 0 0-4 4v1M8.6 4c0 .8.1 1.9 1.5 2.6 1.4.7 3 .3 3 2.3 0 .3 0 2 1.9 2 2 0 2-1.7 2-2 0-.6.5-.9 1.2-.9H20m1 4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                      ${event.region_gmt}
                    </div>
                  </div>
                  <!--Third Row-->
                  ${event.statusBtn == 'hide' ? '' : `<div class="row-third column">
                    <a href="${event.link}" target="_blank" class="btn btn-warning btn-custom-event">${event.status}</a>
                  </div>`}
                </div>`;
  
                $("#dom_section").append(cardHtml);
                  } else {
                    let descHtml = Array.isArray(event.desc) ? event.desc.map(line => `<p>${line}</p>`).join('') : `<p>${event.desc}</p>`;
                  let cardHtml = `<div class="card align-items-center custom-card-style">
                  <img
                    src="${event.image}"
                    class="card-img-top"
                    alt="Thumbnail image representing content or a preview of a webinar or seminar event"
                  />
                  <div class="card-body body-custom">
                    <h5 class="card-title title-custom">
                      ${event.title}
                    </h5>
                    <div class="desc-custom">
              ${descHtml}
            </div>
                  </div>
                  <!--Second Row-->
                  <div class="row-second column">
                    <div class="calendar-icon">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"
                        />
                      </svg>
                    </div>
                    <small class="text-muted small-text-custom"
                      >${event.date}</small
                    >
                    <small class="text-muted small-text-custom"
                      >${event.time}</small
                    >
                  </div>
                  <!--Third Row-->
                  ${event.statusBtn == 'hide' ? '' : `<div class="row-third column">
                    <a href="${event.link}" target="_blank" class="btn btn-warning btn-custom-event">${event.status}</a>
                  </div>`}
                </div>`;
  
                $("#dom_section").append(cardHtml);
                  }
  
                  count++;
                }
              });
  
              if (count < itemsDisplayed || itemsDisplayed >= data.length) {
                $("#load_more_btn").hide();
              } else {
                $("#load_more_btn").show();
              }
            }
          );
        }
  
        // Event listener for the 'Load More' button
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
  
        // Initial render for all countries
        renderEvents("all");
      </script>