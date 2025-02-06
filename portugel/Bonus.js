<script>
  $(document).ready(function () {
    // Initially hide all groups
    $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3, .spaingroup1").hide();

    function showOnlySpainGroup() {
      // Show elements with .spaingroup1 class
      $(".spaingroup1").show();
      $(".spaingroup1 section.recurring").remove();

      // Remove all elements except those with .spaingroup1 class
      $(".group1, .group2, .group3, .group4, .japangroup1, .malaysiagroup1, .thaigroup1, .vietnamgroup2, .chinagroup1, .chinagroup3").remove();
    }

    showOnlySpainGroup();
  });
</script>