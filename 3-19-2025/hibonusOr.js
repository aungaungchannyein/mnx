<script>
  $(document).ready(function () {
    // Define your groups and specific countries
    var globalGroup1 = [
      "BN",
      "KH",
      "JP",
      "LA",
      "MM",
      "SG",
      "KR",
      "AL",
      "AD",
      "CZ",
      "DK",
      "EE",
      "FI",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LI",
      "LT",
      "MD",
      "MC",
      "ME",
      "NL",
      "NO",
      "PT",
      "SM",
      "SK",
      "ES",
      "SE",
      "GB",
      "AR",
      "BO",
      "BR",
      "CL",
      "CO",
      "CR",
      "DO",
      "EC",
      "SV",
      "GT",
      "HN",
      "MX",
      "NI",
      "PA",
      "PY",
      "PE",
      "PR",
      "UY",
      "VE",
      "TD",
      "KM",
      "DJ",
      "GQ",
      "ER",
      "KE",
      "MR",
      "MU",
      "SO",
      "EH",
    ];
    var globalGroup2 = [
      "PH",
      "VN",
      "AT",
      "BA",
      "BG",
      "HR",
      "IS",
      "XK",
      "LV",
      "MT",
      "MK",
      "PL",
      "RO",
      "RS",
      "SI",
      "UA",
      "CA",
      "IL",
      "NZ",
    ];

    // Define specific country access
    var specificCountries = {
      MY: ".group4",
      TH: ".thaigroup1",
      JP: ".japangroup1",
      VN: ".vietnamgroup2",
      CN: ".chinagroup3",
      ES: ".spaingroup1",
    };

    // Define groupindia groups
    var groupindia1 = [
      "BH",
      "IQ",
      "OM",
      "QA",
      "AE",
      "PS",
      "TN",
      "DZ",
      "MA",
    ];

    var groupindia2 = ["IN", "BD"];
    var groupindia3 = ["PK", "JO", "KW", "SA", "EG"];
    var groupindia4 = ["AF", "LB", "SY", "YE", "LY"];

    // Retrieve the country code from localStorage
    var countryCode = localStorage.getItem("country_code");

    // Redirect for ZA or groupindia4 countries
    if (countryCode == "ZA" || groupindia4.includes(countryCode)) {
      console.log("Redirecting to monaxa.com");
      window.location.href = "https://monaxa.com";
    }

    // Initially hide all groups, then selectively show relevant group
    $(
      ".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .spaingroup1, .indiagroup1, .indiagroup2, .indiagroup3, .indiagroup4"
    ).hide();

    function removeIrrelevantContent(countryCode) {
      // Check if country code exists
      if (!countryCode) {
        console.log("No country code found in localStorage.");
        return;
      }

      if (globalGroup1.includes(countryCode)) {
        $(".group1").show();
        $(".group1 section.recurring").remove();
      } else if (globalGroup2.includes(countryCode)) {
        $(".group2").show();
        $(".group2 section.recurring").remove();
      } else if (groupindia1.includes(countryCode)) {
        $(".indiagroup1").show();
        $(".indiagroup1 section.recurring").remove();
      } else if (groupindia2.includes(countryCode)) {
        $(".indiagroup2").show();
        $(".indiagroup2 section.recurring").remove();
      } else if (groupindia3.includes(countryCode)) {
        $(".indiagroup3").show();
        $(".indiagroup3 section.recurring").remove();
      } else if (countryCode === "MY" || countryCode === "TH") {
        $(".group4").show();
        $(".group4 section.recurring").remove();
      } else {
        $(".group3").show();
        $(".group3 section.recurring").remove();
      }

      // Remove elements that are not displayed
      $(
        ".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .spaingroup1, .indiagroup1, .indiagroup2, .indiagroup3, .indiagroup4"
      ).each(function () {
        if ($(this).css("display") === "none") {
          $(this).remove();
        }
      });
    }

    removeIrrelevantContent(countryCode);
  });
</script>