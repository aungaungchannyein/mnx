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

      // Initially hide all groups
      $(".group1,.bonus200LatamBrazil, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .spaingroup1, .maxgroup1").hide();
  
      // Retrieve the country code from localStorage
      var countryCode = localStorage.getItem("country_code");

      function removeIrrelevantContent(countryCode) {
        // Check if country code exists
        if (!countryCode) {
          console.log("No country code found in localStorage.");
          return;
        }
  
        if (globalGroup1.includes(countryCode)) {
        //   $(".spaingroup1").show();
        //   $(".spaingroup1 section.recurring").remove();
        $(".bonus200LatamBrazil").show();
        $(".bonus200LatamBrazil section.recurring").remove();
        }
      }


      function showRelevantGroup() {
        if (countryCode === "MX") {
          $(".maxgroup1").show();
          $(".maxgroup1 section.recurring").remove();
        } else {
        //   $(".spaingroup1").show();
        //   $(".spaingroup1 section.recurring").remove();

          $(".bonus200LatamBrazil").show();
          $(".bonus200LatamBrazil section.recurring").remove();

          // Remove all elements except those with .spaingroup1 class
          $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .maxgroup1").remove();
        }
      }

      showRelevantGroup();
      removeIrrelevantContent(countryCode);

     /* function showOnlySpainGroup() {
        // Show elements with .spaingroup1 class
        $(".spaingroup1").show();
        $(".spaingroup1 section.recurring").remove();
  
        // Remove all elements except those with .spaingroup1 class
        $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3").remove();
      }
  
      showOnlySpainGroup();*/
    });
  </script>