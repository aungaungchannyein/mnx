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

// Retrieve the country code from localStorage
var countryCode = localStorage.getItem("country_code");

    // Initially hide all groups
    $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .spaingroup1").hide();

    function removeIrrelevantContent(countryCode) {
      // Check if country code exists
      if (!countryCode) {
        console.log("No country code found in localStorage.");
        return;
      }

      if (globalGroup1.includes(countryCode)) {
        $(".vietnamgroup2").show();
        $(".vietnamgroup2 section.recurring").remove();
      }
    }
    

    function showOnlySpainGroup() {
      // Show elements with .spaingroup1 class
      $(".vietnamgroup2").show();
      $(".vietnamgroup2 section.recurring").remove();

      // Remove all elements except those with .spaingroup1 class
      $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .spaingroup1, .chinagroup1, .chinagroup3").remove();
    }

    removeIrrelevantContent(countryCode);
    showOnlySpainGroup();
  });
</script>